import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { BoardAppendice } from "../interfaces/board_appendice.interface";


@Injectable()
export class BoardAppendiceService {

    getBoardAppendiceSubject    = new Subject<any>();
    getBoardAppendicesSubject   = new Subject<any>();
    
    postBoardAppendiceSubject   = new Subject<any>();
    putBoardAppendiceSubject    = new Subject<any>();
    
    deleteBoardAppendiceSubject = new Subject<any>();

    constructor(private http: HttpClient) {}


    getBoardAppendice(boardappendiceID: string) {
        this.http.get(environment.key+'board-appendices/'+boardappendiceID).subscribe({
            next: (res) => { this.getBoardAppendiceSubject.next(<{ message: string, board_appendice: BoardAppendice }>res); },
            error: (e)  => { this.getBoardAppendiceSubject.next(e); }
        });
    }
    getBoardAppendices(boardID: string) {
        this.http.get(environment.key+'board-appendices/all'+boardID).subscribe({
            next: (res) => { this.getBoardAppendicesSubject.next(<{ message: string, board_appendices: Array<BoardAppendice>, count: number }>res); },
            error: (e)  => { this.getBoardAppendicesSubject.next(e); }
        });
    }

    postBoardAppendice(boardappendice: BoardAppendice, boardID: string) {
        this.http.post(environment.key+'board-appendices/'+boardID, {
            title: boardappendice.title,
            logo: boardappendice.logo,
            url: boardappendice.url,
        }).subscribe({
            next: (res) => { this.postBoardAppendiceSubject.next(<{ message: string, board_appendice: BoardAppendice }>res); },
            error: (e)  => { this.postBoardAppendiceSubject.next(e); }
        });
    }
    putBoardAppendice(boardappendice: BoardAppendice) {
        this.http.put(environment.key+'board-appendices/'+boardappendice._id, {
            title: boardappendice.title,
            logo: boardappendice.logo,
            url: boardappendice.url
        }).subscribe({
            next: (res) => { this.putBoardAppendiceSubject.next(<{ message: string, board_appendice_id: string }>res); },
            error: (e)  => { this.putBoardAppendiceSubject.next(e); }
        });
    }


    deleteBoardAppendice(boardappendiceID: string) {
        this.http.delete(environment.key+'board-appendices/'+boardappendiceID).subscribe({
            next: (res) => { this.deleteBoardAppendiceSubject.next(<{ message: string, board_appendice: BoardAppendice }>res); },
            error: (e)  => { this.deleteBoardAppendiceSubject.next(e); }
        });
    }


}