import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

//observers
import { AuthObserver } from "src/app/obeservers/auth.oberserver";

//services
import { AuthService } from "src/app/services/auth.service";

//interfaces
import { User } from "src/app/interfaces/user.interface";
import { Router } from "@angular/router";


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    host: {
        '(document:keypress)': 'handleKeyboardEvent($event)'
    }
})
export class LoginComponent implements OnInit, OnDestroy {

    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == 'Enter')
          this.login();
      }

    error: string = "";

    email: string = '';
    password: string = '';

    loginSubscription: Subscription;

    constructor(private router: Router,
        private authService: AuthService,
        private authObserver: AuthObserver) {
    }

    ngOnInit() {
        this.loginSubscription = this.authService.loginSubject.subscribe({
            next: (res) => {
                this.authObserver.sending(false);
                if(!res.error) {
                    //removes animations and 
                    clearTimeout(this.loginTimer);

                    //assigns data
                    this.authService.token = res.token;
                    this.authService.refresh = res.refresh;
                    this.authService.user = <User>res.user;

                    //reroutes to landing page
                    this.router.navigate(['/']);

                } else {
                    switch(res.status) {
                        case 400:
                            clearTimeout(this.loginTimer);
                            this.error = 'E-mail and password cannot be empty!';
                            break;
                        case 401:
                            clearTimeout(this.loginTimer);
                            this.error = 'Invalid E-mail or password!';
                            break;
                    }
                }
            }
        })
    }
    ngOnDestroy() {
        clearTimeout(this.loginTimer);
        if(this.loginSubscription) this.loginSubscription.unsubscribe();
    }

    //remove error banner on input change
    removeError() {
        this.error = '';
    }

    loginTimer;
    login() {
        if(this.email && this.password) {
            //pass sending animation and call login
            this.authObserver.sending(true);
            this.authService.login(this.email, this.password);
            
            //timeout
            this.loginTimer = setTimeout(() => {
                this.authObserver.sending(false);
                this.error = "Connection to server timedout";

                //check server health

            }, 5 * 1000);

        } else this.error = 'E-mail and password cannot be empty!';
        

        
    }

    changePage(page: string) {
        this.authObserver.changePage(page);
    }

}