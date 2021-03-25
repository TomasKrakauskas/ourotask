import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { Comment } from "../interfaces/comment.interface";

@Injectable()
export class CommentService {

    getCommentSubject           = new Subject<any>();
    getCommentsSubject          = new Subject<any>();
    getCommentRepliesSubject    = new Subject<any>();
    
    postCommentSubject    = new Subject<any>();
    
    deleteCommentSubject  = new Subject<any>();

    constructor(private http: HttpClient) {}


    getComment(commentID: string) {
        this.http.get(environment.key+'comments/'+commentID).subscribe({
            next: (res) => { this.getCommentSubject.next(<{ message: string, comment: Comment }>res); },
            error: (e)  => { this.getCommentSubject.next(e); }
        });
    }
    getComments(taskID: string) {
        this.http.get(environment.key+'comments/all'+taskID).subscribe({
            next: (res) => { this.getCommentsSubject.next(<{ message: string, comments: Array<Comment>, count: number }>res); },
            error: (e)  => { this.getCommentsSubject.next(e); }
        });
    }
    getCommentReplies(replyID: string) {
        this.http.get(environment.key+'comments/all'+replyID+'/replies').subscribe({
            next: (res) => { this.getCommentRepliesSubject.next(<{ message: string, comments: Array<Comment>, count: number }>res); },
            error: (e)  => { this.getCommentRepliesSubject.next(e); }
        });
    }

    postComment(comment: Comment, taskID: string) {
        this.http.post(environment.key+'comments/'+taskID, {
            reply: comment.reply,
            content: comment.content,
        }).subscribe({
            next: (res) => { this.postCommentSubject.next(<{ message: string, comment: Comment }>res); },
            error: (e)  => { this.postCommentSubject.next(e); }
        });
    }


    deleteComment(commentID: string) {
        this.http.delete(environment.key+'comments/'+commentID).subscribe({
            next: (res) => { this.deleteCommentSubject.next(<{ message: string, comment: Comment }>res); },
            error: (e)  => { this.deleteCommentSubject.next(e); }
        });
    }


}