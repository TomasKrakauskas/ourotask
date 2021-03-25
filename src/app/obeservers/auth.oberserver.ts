import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class AuthObserver {

    sendingSubject = new Subject<boolean>();
    pageSubject = new Subject<string>();

    sending(value: boolean) {
        this.sendingSubject.next(value);
    }
    changePage(value: string) {
        this.pageSubject.next(value);
    }

}