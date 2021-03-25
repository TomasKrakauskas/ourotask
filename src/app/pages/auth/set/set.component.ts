import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthObserver } from "src/app/obeservers/auth.oberserver";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-set',
    templateUrl: 'set.component.html',
    styleUrls: ['set.component.scss']
})
export class SetComponent implements OnInit, OnDestroy {

    token: string;


    email: string = '';
    password: string = '';
    confirm_password: string = '';

    error: string = '';

    resetPasswordSubscription: Subscription;

    invalid = [false, false];

    constructor(private router: Router, private route: ActivatedRoute,
        private authService: AuthService, private authObserver: AuthObserver) {
        this.route.queryParams.subscribe(params => {
            if(!params['email'] || !params['token']) 
                this.router.navigate(['/auth'], { queryParams: { page: 'login' }})
            this.email = params['email'];
            this.token = params['token'];
            setTimeout(() => {
                (<HTMLInputElement>document.getElementById('email')).value = this.email;
            }, 500);
        });
    }

    ngOnInit() {
        this.resetPasswordSubscription = this.authService.resetSubject.subscribe({
            next: (res) => {
                if(!res.error) {
                    clearTimeout(this.setTimer);
                    this.authObserver.sending(false);
                    console.log('success');
                    console.log(res);
                    
                    //redirect user to software

                } else {
                    switch(res.status) {
                        case 400:
                            clearTimeout(this.setTimer);
                            this.authObserver.sending(false);
                            this.error = 'All fields must be filled!'
                            break;
                        case 401:
                            clearTimeout(this.setTimer);
                            this.authObserver.sending(false);
                            this.error = 'Invalid or expired token. You will be redirected shortly!';
                            setTimeout(() => {
                                this.router.navigate(['/auth'], { queryParams: { page: 'login' }});
                            }, 3 * 1000);
                            break;
                        case 500:
                            clearTimeout(this.setTimer);
                            this.authObserver.sending(false);
                            this.error = 'Something went wrong. Try again later!'
                            break;
                    }
                }
            }
        });
    }
    ngOnDestroy() {
        if(this.resetPasswordSubscription) this.resetPasswordSubscription.unsubscribe();
    }
    //remove error banner on input change
    removeError(field: number) {
        this.error = '';
        this.invalid[field] = false;
    }
    changePage(page: string) {
        this.router.navigate(['/auth'], { queryParams: { page: 'login' }});
    }
    setTimer;
    set() {
        if(!this.email && !this.token)
            this.router.navigate(['/auth'], { queryParams: { page: 'login' }});
        if(this.password && this.confirm_password) {
            if(this.password == this.confirm_password) {

                let response = this.authService.passwordValidator(this.password);
                if(response.value) {
                    this.authService.reset(this.token, this.email, this.password);
                    this.authObserver.sending(true);
                    this.setTimer = setTimeout(() => {
                        this.authObserver.sending(false);
                        this.error = "Connection to server timedout";
            
                        //check server health

                    }, 5 * 1000);

                } else this.error = response.error;

            } else this.error = 'Password do not match!';
        }
        else this.error = 'Fields cannot be empty!'
    }
    //check if password is valid
    checkPassword() {
        let response = this.authService.passwordValidator(this.password);

        if(!this.password || !this.confirm_password)
            return; //do nothing
        else if(this.password != this.confirm_password) {
            this.error = 'Passwords must match!';
            this.invalid[0] = true;
            this.invalid[1] = true;
        }
        else if(!response.value) {
            this.error = response.error;
            this.invalid[0] = true;
            this.invalid[1] = true;

        } else {
            this.removeError(0);
            this.removeError(1);
        }
    }

    //password criteria validator
    criteria1() {
        if(this.password.length < 6) return false;
        else return true;
    }
    criteria2() {
        for(let i = 0; i < this.password.length; i++) 
            if(this.password[i] == this.password[i].toUpperCase()) return true;
        return false
    }
    criteria3() {
        for(let i = 0; i < this.password.length; i++) 
            if(this.password[i] == this.password[i].toLowerCase()) return true;
        return false;
    }
    criteria4() {
        if(this.password.replace(/\D/g, '').length <= 0) return false;
        else return true;
    }



}