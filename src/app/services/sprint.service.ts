import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { Sprint } from "../interfaces/sprint.interface";

@Injectable()
export class SprintService {

    getSprintSubject    = new Subject<any>();
    getSprintsSubject   = new Subject<any>();
    
    postSprintSubject           = new Subject<any>();
    putSprintSubject            = new Subject<any>();
    putSprintCompletionSubject  = new Subject<any>();
    
    deleteSprintSubject  = new Subject<any>();

    constructor(private http: HttpClient) {}


    getSprint(sprintID: string) {
        this.http.get(environment.key+'sprints/'+sprintID).subscribe({
            next: (res) => { this.getSprintSubject.next(<{ message: string, sprint: Sprint }>res); },
            error: (e)  => { this.getSprintSubject.next(e); }
        });
    }
    getSprints(creatorID: string) {
        this.http.get(environment.key+'sprints/all'+creatorID).subscribe({
            next: (res) => { this.getSprintsSubject.next(<{ message: string, sprints: Array<Sprint>, count: number }>res); },
            error: (e)  => { this.getSprintsSubject.next(e); }
        });
    }

    postSprint(sprint: Sprint, boardID: string) {
        this.http.post(environment.key+'sprints/'+boardID, {
            title: sprint.title,
            due_date: sprint.due_date,
        }).subscribe({
            next: (res) => { this.postSprintSubject.next(<{ message: string, sprint: Sprint }>res); },
            error: (e)  => { this.postSprintSubject.next(e); }
        });
    }
    putSprint(sprint: Sprint) {
        this.http.put(environment.key+'sprints/'+sprint._id, {
            title: sprint.title,
        }).subscribe({
            next: (res) => { this.putSprintSubject.next(<{ message: string, sprint_id: string }>res); },
            error: (e)  => { this.putSprintSubject.next(e); }
        });
    }
    putSprintComplete(sprint: Sprint) {
        this.http.put(environment.key+'sprints/'+sprint._id, { } ).subscribe({
            next: (res) => { this.putSprintSubject.next(<{ message: string, sprint_id: string }>res); },
            error: (e)  => { this.putSprintSubject.next(e); }
        });
    }


    deleteSprint(sprintID: string) {
        this.http.delete(environment.key+'sprints/'+sprintID).subscribe({
            next: (res) => { this.deleteSprintSubject.next(<{ message: string, sprint: Sprint }>res); },
            error: (e)  => { this.deleteSprintSubject.next(e); }
        });
    }


}