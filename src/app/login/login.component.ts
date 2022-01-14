import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderOverlayService } from '../common/loader-overlay/loader-overlay.service';
import { AuthService } from '../services/auth.service';
import { TrainingService } from '../services/training.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // isLoggedIn: boolean = false;
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private trainingService: TrainingService,
    private authService: AuthService,
    private loaderOverlayService: LoaderOverlayService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      localStorage.removeItem("isLoggedIn");
      this.trainingService.sendMessage(false);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('login', this.loginForm.value);
      this.loaderOverlayService.openLoader();
      this.userService.login(this.loginForm.value)
        .subscribe((res: any) => {
          this.loaderOverlayService.removeLoader();
          console.log(41,res)
          if(res.responseMsg.ReasonPhrase == "Unauthorized"){
            this.messageService.add({ severity: 'error', summary: 'Invalid Credentials'});
          }else {
            this.userService.isLoggedIn = true;
            // this.trainingService.sendMessage("LoggedIn");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("Username", this.loginForm.value.username);
            localStorage.setItem('token', res.Token);
            localStorage.setItem('UserId', res.user.UserId)

            this.messageService.add({ severity: 'success', summary: `Welcome ${this.loginForm.value.username}` });
            this.router.navigate(['dashboard']);
            
            let a = this.userService.getAuthentication();
            console.log(49, a);
            this.trainingService.sendMessage(a);
          }
        })
    }
  }

}
