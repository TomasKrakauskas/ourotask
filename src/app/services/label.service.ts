import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { Label } from "../interfaces/label.interface";

@Injectable()
export class LabelService {

    getLabelSubject     = new Subject<any>();
    getLabelsSubject    = new Subject<any>();
    
    postLabelSubject    = new Subject<any>();
    putLabelSubject     = new Subject<any>();
    
    deleteLabelSubject  = new Subject<any>();

    constructor(private http: HttpClient) {}


    getLabel(labelID: string) {
        this.http.get(environment.key+'labels/'+labelID).subscribe({
            next: (res) => { this.getLabelSubject.next(<{ message: string, label: Label }>res); },
            error: (e)  => { this.getLabelSubject.next(e); }
        });
    }
    getLabels(boardID: string) {
        this.http.get(environment.key+'labels/all'+boardID).subscribe({
            next: (res) => { this.getLabelsSubject.next(<{ message: string, labels: Array<Label>, count: number }>res); },
            error: (e)  => { this.getLabelsSubject.next(e); }
        });
    }

    postLabel(label: Label, boardID: string) {
        this.http.post(environment.key+'labels/'+boardID, {
            title: label.title,
            color: label.color,
        }).subscribe({
            next: (res) => { this.postLabelSubject.next(<{ message: string, label: Label }>res); },
            error: (e)  => { this.postLabelSubject.next(e); }
        });
    }
    putLabel(label: Label) {
        this.http.put(environment.key+'labels/'+label._id, {
            title: label.title,
            color: label.color,
        }).subscribe({
            next: (res) => { this.putLabelSubject.next(<{ message: string, label_id: string }>res); },
            error: (e)  => { this.putLabelSubject.next(e); }
        });
    }


    deleteLabel(labelID: string) {
        this.http.delete(environment.key+'labels/'+labelID).subscribe({
            next: (res) => { this.deleteLabelSubject.next(<{ message: string, label: Label }>res); },
            error: (e)  => { this.deleteLabelSubject.next(e); }
        });
    }


}