  
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

//services
import { AuthService } from '../services/auth.service';

@Injectable()
export class StandardInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(!this.auth.token)
            request = request.clone({
                setHeaders: {
                    // 'Content-Type': 'application/json; charset=utf-8',
                    ContentType: 'application/json; charset=utf-8',
                },
            });
        else
            request = request.clone({
                setHeaders: {
                    // 'Content-Type': 'application/json; charset=utf-8',
                    ContentType: 'application/json; charset=utf-8',
                    "authorization": this.auth.token,
                },
            });

        
        return next.handle(request);
    }
}