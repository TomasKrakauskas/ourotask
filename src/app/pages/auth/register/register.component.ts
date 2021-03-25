import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthObserver } from "src/app/obeservers/auth.oberserver";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

    alias: string = '';
    email: string = '';
    password: string = '';
    confirm_password: string = '';

    error: string = '';
    invalid = [false, false, false, false];

    registerSubscription: Subscription;

    constructor(private authService: AuthService, private authObserver: AuthObserver) {
        
    }

    ngOnInit() {
        this.registerSubscription = this.authService.registerSubject.subscribe({
            next: (res) => {
                if(!res.error) {
                    this.authObserver.sending(false);
                    clearTimeout(this.registerTimer);
                    console.log('success');
                    console.log(res);

                    //redirect user to software

                } else {
                    switch(res.status) {
                        case 400:
                            this.authObserver.sending(false);
                            clearTimeout(this.registerTimer);
                            this.error = 'All fields must be filled!';
                            break;
                        case 406:
                            this.authObserver.sending(false);
                            clearTimeout(this.registerTimer);
                            this.error = 'Password does not meet criteria!';
                            this.invalid[2] = true;
                            break;
                        case 409:
                            this.authObserver.sending(false);
                            clearTimeout(this.registerTimer);
                            this.error = 'Email is taken!';
                            this.invalid[1] = true;
                            break;

                    }
                }
            }
        })
    }
    ngOnDestroy() {
        if(this.registerSubscription) this.registerSubscription.unsubscribe();
    }

    //remove error banner on input change
    removeError(field: number) {
        this.error = '';
        this.invalid[field] = false;
    }
    
    registerTimer;
    register() {
        //check if fields are filled
        if(this.alias && this.email && this.password && this.confirm_password) {
            //check if email is valid
            let response = this.authService.emailValidator(this.email);
            if(response.value) {
                if(this.confirm_password == this.password) {

                    //check if password is valid
                    let response = this.authService.passwordValidator(this.password);
                    if(response.value) {
                        this.authService.register(this.alias, this.email, this.password);
                        this.registerTimer = setTimeout(() => {
                            this.authObserver.sending(false);
                            this.error = "Connection to server timedout";
            
                            //check server health
            
                        }, 5 * 1000);

                    } else {
                        this.invalid[2] = true;
                        this.error = response.error;
                    }
                }
                else this.error = 'Passwords must match!'; 
            } else {
                this.invalid[1] = true;
                this.error = response.error;
            }

            
            
        } else {
            this.invalid[0] = true;
            this.invalid[1] = true;
            this.invalid[2] = true;
            this.invalid[3] = true;
            this.error = 'All fields must be filled';
        }
    }

    changePage(page: string) {
        this.authObserver.changePage(page);
    }



    //checks if email is valid
    checkEmail() {
        let response = this.authService.emailValidator(this.email);
        console.log(response);
        if(response.value) this.removeError(1);
        else {
            this.error = response.error;
            this.invalid[1] = true;
        }
    }
    //check if password is valid
    checkPassword() {
        let response = this.authService.passwordValidator(this.password);

        if(!this.password || !this.confirm_password)
            return; //do nothing
        else if(this.password != this.confirm_password) {
            this.error = 'Passwords must match!';
            this.invalid[2] = true;
            this.invalid[3] = true;
        }
        else if(!response.value) {
            this.error = response.error;
            this.invalid[2] = true;
            this.invalid[3] = true;

        } else {
            this.removeError(2);
            this.removeError(3);
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