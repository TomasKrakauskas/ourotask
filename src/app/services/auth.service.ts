import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../interfaces/user.interface";

@Injectable()
export class AuthService {
    key = environment.key



    token: string;
    refresh: string;
    user: User


    getUserSubject = new Subject<any>();
    checkSubject = new Subject<any>();

    loginSubject = new Subject<any>();
    refreshSubject = new Subject<any>();
    registerSubject = new Subject<any>();

    requestResetSubject = new Subject<any>();
    resetSubject = new Subject<any>();

    logoutSubject = new Subject<any>();


    constructor(private http: HttpClient) {}

    check() {
        this.http.get(this.key + 'check').subscribe({
            next: (res) => { this.checkSubject.next(<{ message: string }>res); },
            error: (e)  => { this.checkSubject.next(e); },
        });
    }
    getUser() {
        this.http.get(this.key).subscribe({
            next: (res) => { this.getUserSubject.next(<{ 
                message: string,
                user: User
            }>res); },
            error: (e)  => { this.getUserSubject.next(e); },
        });
    }

    login(email: string, password: string) {
        this.http.post(this.key, {
            email: email, 
            password: password
        }).subscribe({
            next: (res) => { this.loginSubject.next(<{ 
                message: string,
                token: string,
                refresh: string,
                user: User
            }>res); },
            error: (e)  => { this.loginSubject.next(e); },
        });
    }
    register(alias: string, email: string, password: string) {
        this.http.post(this.key + 'register', {
            alias: alias, 
            email: email, 
            password: password
        }).subscribe({
            next: (res) => { this.registerSubject.next(<{message: string}>res); },
            error: (e)  => { this.registerSubject.next(e); },
        });
    }

    refresh_session() {
        this.http.post(this.key + 'refresh', {} ).subscribe({
            next: (res) => { this.refreshSubject.next(<{ 
                message: string,
                token: string,
                refresh: string,
                user: User
            }>res); },
            error: (e)  => { this.refreshSubject.next(e); },
        });
    }

    requestReset(email: string) {
        this.http.put(this.key + 'reset', {
            email: email
        } ).subscribe({
            next: (res) => { this.requestResetSubject.next(<{ message: string }>res); },
            error: (e)  => { this.requestResetSubject.next(e); },
        });
    }
    reset(token: string, email: string, password: string) {
        this.http.put(this.key + 'reset/' + token, {
            token: token,
            email: email,
            password: password,
        } ).subscribe({
            next: (res) => { this.resetSubject.next(<{ message: string }>res); },
            error: (e)  => { this.resetSubject.next(e); },
        });
    }
    

    logout() {
        this.http.delete(this.key + 'logout').subscribe({
            next: (res) => { this.logoutSubject.next(<{ message: string }>res); },
            error: (e)  => { this.logoutSubject.next(e); },
        });
    }

    passwordValidator(password) {
        if(password.length < 6) return { value: false, error: 'Must be longer than 6 characters'}
        let upper = 0;
        let lower = 0;
        for(let i = 0; i < password.length; i++) {
          if(password[i] == password[i].toLowerCase()) lower++;
          if(password[i] == password[i].toUpperCase()) upper++;
        }
        if(!upper) return { value: false, error: 'Must contain atleast 1 upper case letter'}
        if(!lower) return { value: false, error: 'Must contain atleast 1 lower case letter'}
        if(password.replace(/\D/g, '').length <= 0)  return { value: false, error: 'Must contain atleast 1 digit'}
  
        return { value: true, error: null }
    }
    emailValidator(email) {
        if(!email) return { value: false, error: 'email cannot be empty!' }
        if(email.indexOf('@') == -1) return { value: false, error: 'not valid email!' }
        else if(email.substring(email.indexOf('@')).indexOf('.') == -1) return { value: false, error: 'not valid email!' }
        else return { value: true, error: null }
    }


}