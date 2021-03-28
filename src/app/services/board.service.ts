import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { Board } from "../interfaces/board.interface";

@Injectable()
export class BoardService {

    getBoardSubject                 = new Subject<any>();
    getBoardsSubject                = new Subject<any>();
    getFavoriteBoardsSubject        = new Subject<any>();
    getNonFavoriteBoardsSubject     = new Subject<any>();
    
    postBoardSubject    = new Subject<any>();
    putBoardSubject     = new Subject<any>();
    
    deleteBoardSubject  = new Subject<any>();

    constructor(private http: HttpClient) {}


    getBoard(boardID: string) {
        this.http.get(environment.key+'boards/'+boardID).subscribe({
            next: (res) => { this.getBoardSubject.next(<{ message: string, board: Board }>res); },
            error: (e)  => { this.getBoardSubject.next(e); }
        });
    }
    getBoards(creatorID: string) {
        this.http.get(environment.key+'boards/all/'+creatorID).subscribe({
            next: (res) => { this.getBoardsSubject.next(<{ message: string, boards: Array<Board>, count: number }>res); },
            error: (e)  => { this.getBoardsSubject.next(e); }
        });
    }
    getFavoriteBoards(creatorID: string) {
        this.http.get(environment.key+'boards/all/'+creatorID+'/favorite').subscribe({
            next: (res) => { this.getFavoriteBoardsSubject.next(<{ message: string, boards: Array<Board>, count: number }>res); },
            error: (e)  => { this.getFavoriteBoardsSubject.next(e); }
        });
    }
    getNonFavoriteBoards(creatorID: string) {
        this.http.get(environment.key+'boards/all/'+creatorID+'/non-favorite').subscribe({
            next: (res) => { this.getNonFavoriteBoardsSubject.next(<{ message: string, boards: Array<Board>, count: number }>res); },
            error: (e)  => { this.getNonFavoriteBoardsSubject.next(e); }
        });
    }

    postBoard(board: Board) {
        this.http.post(environment.key+'boards/', {
            title: board.title,
            description: board.description,
            counter_appendice: board.counter_appendice,
        }).subscribe({
            next: (res) => { this.postBoardSubject.next(<{ message: string, board: Board }>res); },
            error: (e)  => { this.postBoardSubject.next(e); }
        });
    }
    putBoard(board: Board) {
        this.http.put(environment.key+'boards/'+board._id, {
            title: board.title,
            description: board.description,
            favorite: board.favorite
        }).subscribe({
            next: (res) => { this.putBoardSubject.next(<{ message: string, board_id: string }>res); },
            error: (e)  => { this.putBoardSubject.next(e); }
        });
    }


    deleteBoard(boardID: string) {
        this.http.delete(environment.key+'boards/'+boardID).subscribe({
            next: (res) => { this.deleteBoardSubject.next(<{ message: string, board: Board }>res); },
            error: (e)  => { this.deleteBoardSubject.next(e); }
        });
    }


}