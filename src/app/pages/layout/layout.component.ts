import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DeleteObserver } from "src/app/obeservers/delete.observer";

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

    delete_dialog: boolean = false;

    openDeleteDialogSubscription: Subscription;
    closeDeleteDialogSubscription: Subscription;

    constructor(private deleteObserver: DeleteObserver) { }

    ngOnInit() {
        this.openDeleteDialogSubscription = this.deleteObserver.openDeleteDialogSubject.subscribe({
            next: (res) => {
              if(!this.delete_dialog) {
                this.delete_dialog = true;
                setTimeout(() => this.deleteObserver.openDialog(res.item, res.object, res.page, res.section), 200)
              }
            }
          });
          this.closeDeleteDialogSubscription = this.deleteObserver.closeDeleteDialogSubject.subscribe({
            next: (res) => {
              this.delete_dialog = false;
            }
          });
    }
    ngOnDestroy() {
        if(this.openDeleteDialogSubscription)   this.openDeleteDialogSubscription.unsubscribe();
        if(this.closeDeleteDialogSubscription)  this.closeDeleteDialogSubscription.unsubscribe();
    }

}