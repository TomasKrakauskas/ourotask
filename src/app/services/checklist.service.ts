import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { Checklist } from "../interfaces/checklist.interface";

@Injectable()
export class ChecklistService {

    getChecklistSubject     = new Subject<any>();
    getChecklistsSubject    = new Subject<any>();
    
    postChecklistSubject    = new Subject<any>();
    putChecklistSubject     = new Subject<any>();
    
    deleteChecklistSubject  = new Subject<any>();

    constructor(private http: HttpClient) {}


    getChecklist(checklistID: string) {
        this.http.get(environment.key+'checklist-items/'+checklistID).subscribe({
            next: (res) => { this.getChecklistSubject.next(<{ message: string, checklist: Checklist }>res); },
            error: (e)  => { this.getChecklistSubject.next(e); }
        });
    }
    getChecklists(checklistID: string) {
        this.http.get(environment.key+'checklist-items/all'+checklistID).subscribe({
            next: (res) => { this.getChecklistsSubject.next(<{ message: string, checklists: Array<Checklist>, count: number }>res); },
            error: (e)  => { this.getChecklistsSubject.next(e); }
        });
    }

    postChecklist(checklist: Checklist, checklistID: string, task_typeID: string) {
        this.http.post(environment.key+'checklist-items/task/'+checklistID, {
            task_typeID: task_typeID,
            title: checklist.title,
        }).subscribe({
            next: (res) => { this.postChecklistSubject.next(<{ message: string, checklist: Checklist }>res); },
            error: (e)  => { this.postChecklistSubject.next(e); }
        });
    }
    putChecklist(checklist: Checklist) {
        this.http.put(environment.key+'checklist-items/'+checklist._id, {
            title: checklist.title,
            status: checklist.status,
        }).subscribe({
            next: (res) => { this.putChecklistSubject.next(<{ message: string, checklist_id: string }>res); },
            error: (e)  => { this.putChecklistSubject.next(e); }
        });
    }

    deleteChecklist(checklistID: string) {
        this.http.delete(environment.key+'checklist-items/'+checklistID).subscribe({
            next: (res) => { this.deleteChecklistSubject.next(<{ message: string, checklist: Checklist }>res); },
            error: (e)  => { this.deleteChecklistSubject.next(e); }
        });
    }


}