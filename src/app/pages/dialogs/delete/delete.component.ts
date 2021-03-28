import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Board } from "src/app/interfaces/board.interface";
import { BoardCreationObserver } from "src/app/obeservers/board_creation.observer";
import { DeleteObserver } from "src/app/obeservers/delete.observer";
import { BoardService } from "src/app/services/board.service";

@Component({
    selector: 'app-delete',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})
export class DeleteComponent implements OnInit, OnDestroy {


    item: {
        item: number,
        object: string,
    
        page: string,
        section: string
      }

    openDialogSubscription: Subscription;
    closeDialogSubscription: Subscription;

    constructor(
        private deleteObserver: DeleteObserver) { }

    ngOnInit() {
        this.openDialogSubscription = this.deleteObserver.openDeleteDialogSubject.subscribe({
            next: (res) => {
                    console.log(res);
                    this.item = {
                        item: res.item,
                        object: res.object,
                        page: res.page,
                        section: res.section
                    }
            }
        });
        this.closeDialogSubscription = this.deleteObserver.closeDeleteDialogSubject.subscribe({
            next: (res) => {
                console.log(res);
                this.item = null;
            }
        });
    }
    ngOnDestroy() {
        if(this.openDialogSubscription) this.openDialogSubscription.unsubscribe();
        if(this.closeDialogSubscription) this.closeDialogSubscription.unsubscribe();
    }

    yes()    { this.deleteObserver.closeDialog(true, this.item.item, this.item.page, this.item.section);  }
    cancel() { this.deleteObserver.closeDialog(false, this.item.item, this.item.page, this.item.section); }

}