import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root'})
export class UserService {
    isLoggedIn : boolean = false;

    constructor(
        private http: HttpClient
    ) { }

    login(data: any) {
        return this.http.post(`${environment.apiUrl}/account/authenticate`, data);
    }

    getHoliday() {
        return this.http.get(`${environment.apiUrl}/holidays`);
    }

    getAuthentication(){
        let loggedIn = localStorage.getItem("isLoggedIn");
        return loggedIn ;
      }

    getNavigation(userId : any){
        return this.http.get(`${environment.apiUrl}/account/getAuthorizedMenu?userId=${userId}`)
      }
}