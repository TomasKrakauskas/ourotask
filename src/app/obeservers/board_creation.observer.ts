import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class BoardCreationObserver {

    dialogOpenSubject = new Subject<boolean>();
    dialogCloseSubject = new Subject<boolean>();

    constructor() {

    }

    openDialog() {
        this.dialogOpenSubject.next(true);
    }
    closeDialog(created: boolean) {
        this.dialogCloseSubject.next(created);
    }


    
}