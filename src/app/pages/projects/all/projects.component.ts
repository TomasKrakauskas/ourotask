import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

//services
import { AuthService } from "src/app/services/auth.service";
import { BoardService } from "src/app/services/board.service";

//interfaces
import { Board } from "src/app/interfaces/board.interface";

//observers
import { BoardCreationObserver } from "src/app/obeservers/board_creation.observer";
import { DeleteObserver } from "src/app/obeservers/delete.observer";

@Component({
    selector: 'app-projects',
    templateUrl: 'projects.component.html',
    styleUrls: ['projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {


    favorites: Array<Board>;
    nonFavorites: Array<Board>;
    projects: Array<Board>;

    getFavoriteBoardsSubscription: Subscription;
    getNonFavoriteBoardsSubscription: Subscription;
    putBoardSubscription: Subscription;
    deleteBoardSubscription: Subscription;

    update_container: string = ''
    delete_container: string = ''


    creation_dialog: boolean = false;
    closeCreationDialogSubscription: Subscription;

    closeDeleteDialogSubscription: Subscription;

    constructor(private router: Router,
        private authService: AuthService,
        private boardService: BoardService,
        private boardCreationObserver: BoardCreationObserver, private deleteObserver: DeleteObserver) {

            this.favorites = new Array<Board>();
            this.nonFavorites = new Array<Board>();
            this.projects = new Array<Board>();

            this.boardService.getFavoriteBoards(this.authService.user._id);
            this.boardService.getNonFavoriteBoards(this.authService.user._id);
        }

    ngOnInit() {
        this.closeCreationDialogSubscription = this.boardCreationObserver.dialogCloseSubject.subscribe({
            next: (res) => {
                //was a board created?
                if(res) {
                    this.creation_dialog = false;
                    this.boardService.getNonFavoriteBoards(this.authService.user._id);

                } else this.creation_dialog = false;
            }
        });
        this.closeDeleteDialogSubscription = this.deleteObserver.closeDeleteDialogSubject.subscribe({
            next: (res) => {
                if (res.delete && res.item != null && res.page == 'LANDING')
                    switch (res.section) {
                        case 'BOARD-FAVORITE':
                            this.delete_container = 'FAVORITE';
                            this.boardService.deleteBoard(this.favorites[res.item]._id);
                            break;
                        case 'BOARD-NON-FAVORITE':
                            this.delete_container = 'NON-FAVORITE';
                            this.boardService.deleteBoard(this.nonFavorites[res.item]._id);
                            break;
                    }
            }
        });

        this.getFavoriteBoardsSubscription = this.boardService.getFavoriteBoardsSubject.subscribe({
            next: (res) => {
                if(!res.error) {

                    console.log(res);
                    this.favorites = <Array<Board>>res.boards;

                } else {
                    switch(res.status) {
                        case 401:
                            //refresh tokens?
                            break;
                        case 500:
                            //call floating error box
                            break;
                    }
                }
            }
        });
        this.getNonFavoriteBoardsSubscription = this.boardService.getNonFavoriteBoardsSubject.subscribe({
            next: (res) => {
                if(!res.error) {

                    console.log(res);
                    this.nonFavorites = <Array<Board>>res.boards;

                } else {
                    switch(res.status) {
                        case 401:
                            //refresh tokens?
                            break;
                        case 500:
                            //call floating error box
                            break;
                    }
                }
            }
        });
        this.putBoardSubscription = this.boardService.putBoardSubject.subscribe({
            next: (res) => {
                if(!res.error) {
                    switch(this.update_container) {
                        case 'FAVORITE':
                            for(let i = 0; i < this.favorites.length; i++)
                                if(this.favorites[i]._id == res.board_id) {
                                    this.favorites.splice(i, 1);
                                    this.boardService.getNonFavoriteBoards(this.authService.user._id);
                                    break;
                                }
                            break;
                        case 'NON-FAVORITE':
                            for(let i = 0; i < this.nonFavorites.length; i++)
                                if(this.nonFavorites[i]._id == res.board_id) {
                                    this.nonFavorites.splice(i, 1);
                                    this.boardService.getFavoriteBoards(this.authService.user._id);
                                    break;
                                }
                            break;
                    }
                    this.update_container = '';

                } else {
                    this.update_container = '';
                    switch(res.status) {
                        case 401:
                            //refresh tokens?
                            break;
                        case 500:
                            //call floating error box
                            break;
                    }
                }
            }
        });
        this.deleteBoardSubscription = this.boardService.deleteBoardSubject.subscribe({
            next: (res) => {
                if(!res.error) {
                    console.log(res);
                    switch(this.update_container) {
                        case 'FAVORITE':
                            this.boardService.getFavoriteBoards(this.authService.user._id);
                            break;
                        case 'NON-FAVORITE':
                            this.boardService.getNonFavoriteBoards(this.authService.user._id);
                            break;
                    }


                } else {
                    switch(res.status) {
                        case 401:
                            //refresh tokens?
                            break;
                        case 500:
                            //call floating error box
                            break;
                    }
                }
            }
        });
    }
    ngOnDestroy() {
        if(this.closeCreationDialogSubscription) this.closeCreationDialogSubscription.unsubscribe();
    
        if(this.getFavoriteBoardsSubscription)      this.getFavoriteBoardsSubscription.unsubscribe();
        if(this.getNonFavoriteBoardsSubscription)   this.getNonFavoriteBoardsSubscription.unsubscribe();
        if(this.putBoardSubscription)               this.putBoardSubscription.unsubscribe();

        if(this.deleteBoardSubscription)            this.deleteBoardSubscription.unsubscribe();
    }

    create() {
        this.creation_dialog = true;
    }
    update(container: string, value: boolean, index: number) {
        this.update_container = container;
        switch(container) {
            case 'FAVORITE':
                this.favorites[index].favorite = value; 
                this.boardService.putBoard(this.favorites[index]);
                break;
            case 'NON-FAVORITE':
                this.nonFavorites[index].favorite = value; 
                this.boardService.putBoard(this.nonFavorites[index]);
                break;
        }
    }
    delete(i: number, container: string) {
        switch(container) {
            case 'FAVORITE':
                this.deleteObserver.openDialog(i, this.favorites[i].title, 'LANDING', 'BOARD-FAVORITE');
                break;
            case 'NON-FAVORITE': 
                this.deleteObserver.openDialog(i, this.nonFavorites[i].title, 'LANDING', 'BOARD-NON-FAVORITE');
                break;
        }
        
    }

}