import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  public isAuthenticated(): boolean {
    try{
        const token: any = localStorage.getItem('token');
        let decodedVal: any = jwt_decode(token);
        let currentTime = Date.now();
        return (currentTime/1000) < decodedVal.exp;
    } catch (err){
        console.log(err);
        return false;
    }
}

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
    return this.http.post<any>(`${environment.apiUrl}/token`, body)
      .pipe(
        tap((res: any) => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        })
      );
  }

}
