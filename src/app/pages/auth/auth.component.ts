import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthObserver } from "src/app/obeservers/auth.oberserver";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

    sending: boolean = false;
    notice: string = "";

    sendingSubscription: Subscription;
    PageSubscription: Subscription;

    //enables/disables page
    loginShow:      boolean = false;
    registerShow:   boolean = false;
    resetShow:      boolean = false;
    setShow:        boolean = false;

    open_animation = {
        login: false,
        register: false,
        reset: false,
        set: false,
    }
    close_animation = {
        login: false,
        register: false,
        reset: false,
        set: false,
    }

    constructor(private route: ActivatedRoute, private router: Router, 
        private authObserver: AuthObserver) {
        this.route.queryParams.subscribe(params => {
            this.registerShow = false;
            this.resetShow = false;
            this.setShow = false;
            this.loginShow = false;
            switch(params['page']) {
                case 'register':
                    this.registerShow = true;
                    break;
                case 'reset':
                    this.resetShow = true;
                    break;
                case 'set':
                    this.setShow = true;
                    break;
                default:
                    this.loginShow = true;
                    break;
            }
        });
    }

    ngOnInit() { 
        this.sendingSubscription = this.authObserver.sendingSubject.subscribe({
            next: (res) => {
                this.sending = res;
            }
        });
        this.PageSubscription = this.authObserver.pageSubject.subscribe({
            next: (res) => {
                if(res) {
                    switch(res) {
                        case 'register':
                            this.open_animation.register = true;
                            this.close_animation = {
                                login: true,
                                register: false,
                                reset: true,
                                set: true,
                            }
                            setTimeout(() => {
                                this.close_animation = {
                                    login: false,
                                    register: false,
                                    reset: false,
                                    set: false,
                                };
                                this.registerShow = false;
                                this.resetShow = false;
                                this.setShow = false;
                                this.loginShow = false;
                                this.router.navigate(['/auth'], {
                                    relativeTo: this.route,
                                    queryParams: { 
                                      page: res
                                    },
                                    queryParamsHandling: 'merge'
                                });
                                setTimeout(() => {
                                    this.open_animation.register = false;
                                }, 800);
                            }, 800);                   
                            break;
                        case 'reset':
                            this.open_animation.reset = true;
                            this.close_animation = {
                                login: true,
                                register: true,
                                reset: false,
                                set: true,
                            }
                            setTimeout(() => {
                                this.close_animation = {
                                    login: false,
                                    register: false,
                                    reset: false,
                                    set: false,
                                }
                                this.registerShow = false;
                                this.resetShow = false;
                                this.setShow = false;
                                this.loginShow = false;
                                this.router.navigate(['/auth'], {
                                    relativeTo: this.route,
                                    queryParams: { 
                                      page: res
                                    },
                                    queryParamsHandling: 'merge'
                                });
                                setTimeout(() => {
                                    this.open_animation.reset = false;
                                }, 800);
                            }, 800);  
                            break;
                        case 'set':
                            this.open_animation.set = true;
                            this.close_animation = {
                                login: true,
                                register: true,
                                reset: true,
                                set: false,
                            }
                            
                            setTimeout(() => {
                                this.close_animation = {
                                    login: false,
                                    register: false,
                                    reset: false,
                                    set: false,
                                }
                                this.registerShow = false;
                                this.resetShow = false;
                                this.setShow = false;
                                this.loginShow = false;
                                this.router.navigate(['/auth'], {
                                    relativeTo: this.route,
                                    queryParams: { 
                                      page: res
                                    },
                                    queryParamsHandling: 'merge'
                                });
                                setTimeout(() => {
                                    this.open_animation.set = false;
                                }, 800);
                            }, 800);  
                            break;
                        case 'login':
                            this.open_animation.login = true;
                            this.close_animation = {
                                login: false,
                                register: true,
                                reset: true,
                                set: true,
                            }
                            setTimeout(() => {
                                this.close_animation = {
                                    login: false,
                                    register: false,
                                    reset: false,
                                    set: false,
                                }
                                this.registerShow = false;
                                this.resetShow = false;
                                this.setShow = false;
                                this.loginShow = false;
                                this.router.navigate(['/auth'], {
                                    relativeTo: this.route,
                                    queryParams: { 
                                      page: res
                                    },
                                    queryParamsHandling: 'merge'
                                });
                                setTimeout(() => {
                                    this.open_animation.login = false;
                                }, 800);
                            }, 800);  
                            break;
                    }
                }
            }
        });
    }
    ngOnDestroy() {
        if(this.sendingSubscription) this.sendingSubscription.unsubscribe();
    }

}