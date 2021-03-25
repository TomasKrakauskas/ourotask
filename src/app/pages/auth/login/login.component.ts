import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthObserver } from "src/app/obeservers/auth.oberserver";
import { AuthService } from "src/app/services/auth.service";

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

    constructor(
        private authService: AuthService,
        private authObserver: AuthObserver) {
    }

    ngOnInit() {
        this.loginSubscription = this.authService.loginSubject.subscribe({
            next: (res) => {
                if(!res.error) {
                    this.authObserver.sending(false);
                    clearTimeout(this.loginTimer);
                    console.log('success');
                    console.log(res);



                } else {
                    switch(res.status) {
                        case 400:
                            this.authObserver.sending(false);
                            clearTimeout(this.loginTimer);
                            this.error = 'E-mail and password cannot be empty!';
                            break;
                        case 401:
                            this.authObserver.sending(false);
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