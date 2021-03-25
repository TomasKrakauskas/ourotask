import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { Task } from "../interfaces/task.interface";

@Injectable()
export class TaskService {

    getTaskSubject             = new Subject<any>();

    getTasksSubject            = new Subject<any>();
    
    postTaskSubject    = new Subject<any>();
    putTaskSubject     = new Subject<any>();
    putTaskLabelSubject     = new Subject<any>();
    putTaskAssigneeSubject     = new Subject<any>();
    
    deleteTaskSubject  = new Subject<any>();
    deleteTaskLabelSubject  = new Subject<any>();
    deleteTaskAssigneeSubject  = new Subject<any>();

    constructor(private http: HttpClient) {}


    getTask(taskID: string) {
        this.http.get(environment.key+'tasks/'+taskID).subscribe({
            next: (res) => { this.getTaskSubject.next(<{ message: string, task: Task }>res); },
            error: (e)  => { this.getTaskSubject.next(e); }
        });
    }

    getTasks(sprintID: string) {
        this.http.get(environment.key+'tasks/sprint'+sprintID).subscribe({
            next: (res) => { this.getTasksSubject.next(<{ message: string, tasks: Array<Task>, count: number }>res); },
            error: (e)  => { this.getTasksSubject.next(e); }
        });
    }
    getTasksByType(sprintID: string, task_typeID: string) {
        this.http.get(environment.key+'tasks/sprint'+sprintID+'/type/'+task_typeID).subscribe({
            next: (res) => { this.getTasksSubject.next(<{ message: string, tasks: Array<Task>, count: number }>res); },
            error: (e)  => { this.getTasksSubject.next(e); }
        });
    }
    getTasksByAssignee(sprintID: string, assigneeID: string) {
        this.http.get(environment.key+'tasks/sprint'+sprintID+'/assignee/'+assigneeID).subscribe({
            next: (res) => { this.getTasksSubject.next(<{ message: string, tasks: Array<Task>, count: number }>res); },
            error: (e)  => { this.getTasksSubject.next(e); }
        });
    }
    getTasksByStatus(sprintID: string, status: string) {
        this.http.get(environment.key+'tasks/sprint'+sprintID+'/status/'+status).subscribe({
            next: (res) => { this.getTasksSubject.next(<{ message: string, tasks: Array<Task>, count: number }>res); },
            error: (e)  => { this.getTasksSubject.next(e); }
        });
    }
    getTasksByCreator(sprintID: string, creatorID: string) {
        this.http.get(environment.key+'tasks/sprint'+sprintID+'/creator/'+creatorID).subscribe({
            next: (res) => { this.getTasksSubject.next(<{ message: string, tasks: Array<Task>, count: number }>res); },
            error: (e)  => { this.getTasksSubject.next(e); }
        });
    }

    postTask(task: Task, sprintID: string) {
        this.http.post(environment.key+'tasks/'+sprintID, {
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            task_type: task.task_type
        }).subscribe({
            next: (res) => { this.postTaskSubject.next(<{ message: string, task: Task }>res); },
            error: (e)  => { this.postTaskSubject.next(e); }
        });
    }
    putTask(task: Task) {
        this.http.put(environment.key+'tasks/'+task._id, {
            title: task.title,
            description: task.description,
            status: task.status,
            due_date: task.due_date,
            task_type: task.task_type
        }).subscribe({
            next: (res) => { this.putTaskSubject.next(<{ message: string, task_id: string }>res); },
            error: (e)  => { this.putTaskSubject.next(e); }
        });
    }
    putTasklabel(task: Task, label_id: string) {
        this.http.put(environment.key+'tasks/'+task._id+'/label', {
            label_id: label_id
        }).subscribe({
            next: (res) => { this.putTaskLabelSubject.next(<{ message: string, task_id: string }>res); },
            error: (e)  => { this.putTaskLabelSubject.next(e); }
        });
    }
    putTaskAssignee(task: Task, assignee_id: string) {
        this.http.put(environment.key+'tasks/'+task._id+'/assignee', {
            assignee_id: assignee_id
        }).subscribe({
            next: (res) => { this.putTaskAssigneeSubject.next(<{ message: string, task_id: string }>res); },
            error: (e)  => { this.putTaskAssigneeSubject.next(e); }
        });
    }


    deleteTask(taskID: string) {
        this.http.delete(environment.key+'tasks/'+taskID).subscribe({
            next: (res) => { this.deleteTaskSubject.next(<{ message: string, task: Task }>res); },
            error: (e)  => { this.deleteTaskSubject.next(e); }
        });
    }
    deleteTaskLabel(taskID: string, labelID: string) {
        this.http.delete(environment.key+'tasks/'+taskID+'/label/'+labelID).subscribe({
            next: (res) => { this.deleteTaskLabelSubject.next(<{ message: string, task: Task }>res); },
            error: (e)  => { this.deleteTaskLabelSubject.next(e); }
        });
    }
    deleteTaskAssignee(taskID: string) {
        this.http.delete(environment.key+'tasks/'+taskID+'/assignee').subscribe({
            next: (res) => { this.deleteTaskAssigneeSubject.next(<{ message: string, task: Task }>res); },
            error: (e)  => { this.deleteTaskAssigneeSubject.next(e); }
        });
    }


}