import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Board } from "src/app/interfaces/board.interface";
import { BoardCreationObserver } from "src/app/obeservers/board_creation.observer";
import { BoardService } from "src/app/services/board.service";

@Component({
    selector: 'app-create-project',
    templateUrl: 'create-project.component.html',
    styleUrls: ['create-project.component.scss']
})
export class CreateProjectComponent implements OnInit, OnDestroy {


    error: string = '';
    validator = [false, false];

    board: Board = {
        _id: null,
        creator_id: null,
        user_group_id: null,

        favorite: false,
        title: '',
        description: '',

        counter: null,
        counter_appendice: '',

        logo_url: null,
        background_url: null,

        createdAt: null
    }

    createBoardSubscription: Subscription;

    constructor(
        private boardService: BoardService,
        private boardCreationObserver: BoardCreationObserver) { }

    ngOnInit() {
        this.createBoardSubscription = this.boardService.postBoardSubject.subscribe({
            next: (res) => {
                if(!res.error) {
                    console.log(res);
                    this.boardCreationObserver.closeDialog(true);

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
    ngOnDestroy() { }

    //input validator for code
    removeError(num: number) {
        if(num == 1) {
            //checks if code exceeds 3 characters
            if(this.board.counter_appendice.length > 3) {
                this.error = 'Code cannot exceed 3 letters';
                this.validator[num] = true;
            }
            //checks if code is less than 3 characters
            else if(this.board.counter_appendice.length < 3) {
                this.error = 'Code cannot be less than 3 letters';
                this.validator[num] = true;
            } 
            //checks if code has digits
            else if(this.board.counter_appendice.replace(/\D/g, '').length > 0) {
                this.error = 'Code cannot contain numbers';
                this.validator[num] = true;
            }
            else this.validator[num] = false;

        }
        else this.validator[num] = false; 
        //if no errors exist remove error baner
        if(!this.validator[0] && !this.validator[1]) this.error = '';
    }
    //on change validator for code input
    deleteSurplus() {
        //removes surplus letters
        if(this.board.counter_appendice.length > 3) {
            let temp = this.board.counter_appendice.substring(0, 3);
            this.board.counter_appendice = temp;
        }
        //removes digits
        else if(this.board.counter_appendice.replace(/\D/g, '').length > 0)
            this.board.counter_appendice = this.board.counter_appendice.replace(/[0-9]/g, '');
        //removes symbols and spaces
        else if(this.board.counter_appendice.replace(/[A-Za-z0-9]/g, '').length > 0)
            this.board.counter_appendice = this.board.counter_appendice.replace(/[^A-Z0-9]/ig, '')

        //capitalises letters
        this.board.counter_appendice = this.board.counter_appendice.toUpperCase();
    }

    create() {
        //checks if inputs are not empty and whether there is an existing error
        if(this.board.title && this.board.counter_appendice)
            if(!this.validator[0] && !this.validator[1])
                this.boardService.postBoard(this.board);
        //if there are no current errors create a new error
        else if(!this.validator[0] && !this.validator[1]){
            this.error = 'Fields cannot be empty';
            if(!this.board.title) this.validator[0] = true;
            if(!this.board.counter_appendice) this.validator[1] = true;
        }
    }
    cancel() {
        this.boardCreationObserver.closeDialog(false);
    }

}