import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

//interfaces
import { UserGroup } from "../interfaces/user_group.interface";

@Injectable()
export class UserGroupService {

    getUserGroupSubject     = new Subject<any>();
    getUserGroupsSubject    = new Subject<any>();
    
    postUserGroupSubject    = new Subject<any>();
    
    putUserGroupSubject     = new Subject<any>();
    putUserGroupUserSubject = new Subject<any>();
    
    deleteUserGroupSubject      = new Subject<any>();
    deleteUserGroupUserSubject  = new Subject<any>();

    constructor(private http: HttpClient) {}


    getUserGroup(usergroupID: string) {
        this.http.get(environment.key+'user-groups/'+usergroupID).subscribe({
            next: (res) => { this.getUserGroupSubject.next(<{ message: string, user_group: UserGroup }>res); },
            error: (e)  => { this.getUserGroupSubject.next(e); }
        });
    }
    getUserGroups(creatorID: string) {
        this.http.get(environment.key+'user-groups/all'+creatorID).subscribe({
            next: (res) => { this.getUserGroupsSubject.next(<{ message: string, user_groups: Array<UserGroup>, count: number }>res); },
            error: (e)  => { this.getUserGroupsSubject.next(e); }
        });
    }

    postUserGroup(usergroup: UserGroup) {
        this.http.post(environment.key+'user-groups/', {
            title: usergroup.title,
        }).subscribe({
            next: (res) => { this.postUserGroupSubject.next(<{ message: string, user_group: UserGroup }>res); },
            error: (e)  => { this.postUserGroupSubject.next(e); }
        });
    }
    putUserGroup(usergroup: UserGroup) {
        this.http.put(environment.key+'user-groups/'+usergroup._id, {
            title: usergroup.title,
        }).subscribe({
            next: (res) => { this.putUserGroupSubject.next(<{ message: string, user_group_id: string }>res); },
            error: (e)  => { this.putUserGroupSubject.next(e); }
        });
    }
    putUserGroupUser(usergroup: UserGroup, user_id: string) {
        this.http.put(environment.key+'user-groups/'+usergroup._id+'/user', {
            user_id: user_id,
        }).subscribe({
            next: (res) => { this.putUserGroupUserSubject.next(<{ message: string, user_group_id: string }>res); },
            error: (e)  => { this.putUserGroupUserSubject.next(e); }
        });
    }


    deleteUserGroupUser(usergroupID: string, userID: string) {
        this.http.delete(environment.key+'user-groups/'+usergroupID+'/user'+userID).subscribe({
            next: (res) => { this.deleteUserGroupUserSubject.next(<{ message: string, user_group_id: UserGroup }>res); },
            error: (e)  => { this.deleteUserGroupUserSubject.next(e); }
        });
    }
    deleteUserGroup(usergroupID: string) {
        this.http.delete(environment.key+'user-groups/'+usergroupID).subscribe({
            next: (res) => { this.deleteUserGroupSubject.next(<{ message: string, user_group: UserGroup }>res); },
            error: (e)  => { this.deleteUserGroupSubject.next(e); }
        });
    }


}