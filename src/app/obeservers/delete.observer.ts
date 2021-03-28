import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DeleteObserver {

    openDeleteDialogSubject = new Subject<{
        item: number, //index
        object: string //name

        page: string, // page identification
        section: string, //section identification     
    }>();
    closeDeleteDialogSubject = new Subject<{
        delete: boolean, //yes or no
        item: number, //index

        page: string, // page identification
        section: string, //section identification         
    }>();

    constructor() {}

    openDialog(index: number, name: string, page: string, section: string) {
        this.openDeleteDialogSubject.next({ item: index, object: name, page: page, section: section });
    }
    closeDialog(del: boolean, index: number, page: string, section: string) {
        this.closeDeleteDialogSubject.next({ delete: del, item: index, page: page, section: section });
    }



}