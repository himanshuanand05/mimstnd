
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoaderOverlayService } from '../common/loader-overlay/loader-overlay.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

const openUrl = ['login', 'signup']

@Injectable()
export default class HttpCustomInterceptor implements HttpInterceptor {

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private loaderOverlayService: LoaderOverlayService,
        private authService: AuthService,
        private tokenService: TokenService
        ) { }

    isOpenUrl(request: HttpRequest<any>) {
        console.log(request.url);
        if (request.url.includes("login") || request.url.includes("signup")) {
            return true;
        }
        return false;
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler) {

        if (this.isOpenUrl(request))
            return next.handle(request);

        let headers: any = {
            'Content-Type': 'application/json'
        };

        let token = this.tokenService.getToken();
        // if (token) {
        //     headers["Authorization"] = "Bearer " + token;
        // }

        console.log(headers)
        let newRequest = request.clone({
            headers: new HttpHeaders(headers)
        });

        // let handleNextRequest = () => {
        //     return next.handle(newRequest).pipe(catchError(err => {
        //         this.loaderOverlayService.removeLoader();
        //         if (err instanceof HttpErrorResponse) {
        //             if (err.status === 400) {
        //                 console.log("Unauthorized");
        //             } else if (err.status === 500) {
        //                 console.log("Internal server error.");
        //             }
        //         }
        //         console.log(err);
        //         this.messageService.add({ severity: 'error', summary: err.message });
        //         return new Observable<HttpEvent<any>>();
        //     }));
        // }

        // if(!this.authService.isAuthenticated()) {
        //     this.authService.refreshToken(this.tokenService.getRefreshToken())
        //         .subscribe( (res: any) => {
        //             return next.handle(newRequest)
        //         });
        //     // return new Observable<HttpEvent<any>>();
        // } else {
        //     // rest of code
        // }

        return next.handle(newRequest).pipe(catchError(err => {
            this.loaderOverlayService.removeLoader();
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    console.log("Unauthorized");
                } else if (err.status === 500) {
                    console.log("Internal server error.");
                }
            }
            console.log(err);
            this.messageService.add({ severity: 'error', summary: err.message });
            return new Observable<HttpEvent<any>>();
        }));
    }
}
