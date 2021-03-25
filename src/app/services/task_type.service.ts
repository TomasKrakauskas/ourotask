import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { TaskType } from "../interfaces/task_type.interface";

@Injectable()
export class TaskTypeService {

    getTaskTypeSubject  = new Subject<any>();
    getTaskTypesSubject = new Subject<any>();
    
    postTaskTypeSubject = new Subject<any>();
    putTaskTypeSubject  = new Subject<any>();
    
    deleteTaskTypeSubject = new Subject<any>();

    constructor(private http: HttpClient) {}


    getTaskType(tasktypeID: string) {
        this.http.get(environment.key+'task-types/'+tasktypeID).subscribe({
            next: (res) => { this.getTaskTypeSubject.next(<{ message: string, task_type: TaskType }>res); },
            error: (e)  => { this.getTaskTypeSubject.next(e); }
        });
    }
    getTaskTypes(creatorID: string) {
        this.http.get(environment.key+'task-types/all'+creatorID).subscribe({
            next: (res) => { this.getTaskTypesSubject.next(<{ message: string, task_types: Array<TaskType>, count: number }>res); },
            error: (e)  => { this.getTaskTypesSubject.next(e); }
        });
    }

    postTaskType(tasktype: TaskType, boardID: string) {
        this.http.post(environment.key+'task-types/'+boardID, {
            title: tasktype.title,
            icon: tasktype.icon,
            color: tasktype.color,
        }).subscribe({
            next: (res) => { this.postTaskTypeSubject.next(<{ message: string, task_type: TaskType }>res); },
            error: (e)  => { this.postTaskTypeSubject.next(e); }
        });
    }
    putTaskType(tasktype: TaskType) {
        this.http.put(environment.key+'task-types/'+tasktype._id, {
            title: tasktype.title,
            icon: tasktype.icon,
            color: tasktype.color
        }).subscribe({
            next: (res) => { this.putTaskTypeSubject.next(<{ message: string, task_type_id: string }>res); },
            error: (e)  => { this.putTaskTypeSubject.next(e); }
        });
    }


    deleteTaskType(tasktypeID: string) {
        this.http.delete(environment.key+'task-types/'+tasktypeID).subscribe({
            next: (res) => { this.deleteTaskTypeSubject.next(<{ message: string, task_type: TaskType }>res); },
            error: (e)  => { this.deleteTaskTypeSubject.next(e); }
        });
    }


}