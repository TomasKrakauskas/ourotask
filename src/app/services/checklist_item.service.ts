import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { ChecklistItem } from "../interfaces/checklist_item.interface";

@Injectable()
export class ChecklistItemService {

    getChecklistItemSubject     = new Subject<any>();
    getChecklistItemsSubject    = new Subject<any>();
    
    postChecklistItemSubject    = new Subject<any>();
    putChecklistItemSubject     = new Subject<any>();
    
    deleteChecklistItemSubject  = new Subject<any>();

    constructor(private http: HttpClient) {}


    getChecklistItem(checklistitemID: string) {
        this.http.get(environment.key+'checklist-items/'+checklistitemID).subscribe({
            next: (res) => { this.getChecklistItemSubject.next(<{ message: string, checklist_item: ChecklistItem }>res); },
            error: (e)  => { this.getChecklistItemSubject.next(e); }
        });
    }
    getChecklistItems(taskID: string) {
        this.http.get(environment.key+'checklist-items/all'+taskID).subscribe({
            next: (res) => { this.getChecklistItemsSubject.next(<{ message: string, checklist_items: Array<ChecklistItem>, count: number }>res); },
            error: (e)  => { this.getChecklistItemsSubject.next(e); }
        });
    }

    postChecklistItem(checklistitem: ChecklistItem, taskID: string, task_typeID: string) {
        this.http.post(environment.key+'checklist-items/'+taskID, {
            task_typeID: task_typeID,
            title: checklistitem.title,
        }).subscribe({
            next: (res) => { this.postChecklistItemSubject.next(<{ message: string, checklist_item: ChecklistItem }>res); },
            error: (e)  => { this.postChecklistItemSubject.next(e); }
        });
    }
    putChecklistItem(checklistitem: ChecklistItem) {
        this.http.put(environment.key+'checklist-items/'+checklistitem._id, {
            title: checklistitem.title,
            status: checklistitem.status,
        }).subscribe({
            next: (res) => { this.putChecklistItemSubject.next(<{ message: string, checklist_item_id: string }>res); },
            error: (e)  => { this.putChecklistItemSubject.next(e); }
        });
    }


    deleteChecklistItem(checklistitemID: string) {
        this.http.delete(environment.key+'checklist-items/'+checklistitemID).subscribe({
            next: (res) => { this.deleteChecklistItemSubject.next(<{ message: string, checklist_item: ChecklistItem }>res); },
            error: (e)  => { this.deleteChecklistItemSubject.next(e); }
        });
    }


}