import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TrainingService } from './training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    public auth: AuthService, 
    public router: Router,
    private trainingService: TrainingService) {}
  canActivate(): boolean {
    return this.checkAuthenticated();
  }

  canActivateChild() : boolean {
    return this.checkAuthenticated();
  }

  private checkAuthenticated(): boolean {
    if (!this.auth.isAuthenticated()) {
      localStorage.removeItem("isLoggedIn");
      this.trainingService.sendMessage(false);
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
