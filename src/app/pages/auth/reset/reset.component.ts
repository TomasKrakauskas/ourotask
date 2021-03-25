import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthObserver } from "src/app/obeservers/auth.oberserver";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-reset',
    templateUrl: 'reset.component.html',
    styleUrls: ['reset.component.scss']
})
export class ResetComponent implements OnInit, OnDestroy {


    error: string = '';
    success: string = '';

    email: string = '';
    
    requestResetSubscription: Subscription;

    constructor(private router: Router,
        private authService: AuthService, private authObserver: AuthObserver) { }

    ngOnInit() {
        this.requestResetSubscription = this.authService.requestResetSubject.subscribe({
            next: (res) => {
                if(!res.error) {
                    this.success = 'Email has been sent! You will shortly be redirected';
                    clearTimeout(this.resetTimer);
                    this.authObserver.sending(false);

                    setTimeout(() => {
                        //add email & token
                        this.authObserver.changePage('login')
                    }, 3 * 1000);
                } else {
                    switch(res.status) {
                        case 500:
                            clearTimeout(this.resetTimer);
                            this.authObserver.sending(false);
                            this.error = 'Something went wrong, try again later!';
                            break;
                    }
                }
            }
        });
    }
    ngOnDestroy() {
        if(this.requestResetSubscription) this.requestResetSubscription.unsubscribe();
    }

    resetTimer;
    reset() {
        let response = this.authService.emailValidator(this.email);
        if(response.value) {
            this.authService.requestReset(this.email);
            this.authObserver.sending(true);
            this.resetTimer = setTimeout(() => {
                this.authObserver.sending(false);
                this.error = "Connection to server timed out";

                //check server health

            }, 5 * 1000);
        }
        else 
            this.error = response.error;
    }

    //checks if email is valid
    checkEmail() {
        console.log(this.email);
        let response = this.authService.emailValidator(this.email);
        if(response.value) 
            this.error = '';
        else 
            this.error = response.error;
        
    }
    changePage(page: string) {
        this.authObserver.changePage(page);
    }

}