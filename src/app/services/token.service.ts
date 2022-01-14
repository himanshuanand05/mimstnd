import { Injectable } from "@angular/core";
import { TokenConstants } from "../shared/app-constants";


@Injectable({
    providedIn: 'root'
})

export class TokenService {
    constructor() { }
    getToken(): any {
        return localStorage.getItem(TokenConstants.ACCESS_TOKEN);
    }

    getRefreshToken(): any {
        return localStorage.getItem(TokenConstants.REFRESH_TOKEN);
    }

    saveToken(token: any): void {
        localStorage.setItem(TokenConstants.ACCESS_TOKEN, token);
    }

    saveRefreshToken(refreshToken: any): void {
        localStorage.setItem(TokenConstants.REFRESH_TOKEN, refreshToken);
    }

    removeToken(): void {
        localStorage.removeItem(TokenConstants.ACCESS_TOKEN);
    }

    removeRefreshToken(): void {
        localStorage.removeItem(TokenConstants.REFRESH_TOKEN);
    }
}