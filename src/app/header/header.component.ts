import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TrainingService } from '../services/training.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn : boolean = false;
  label : any;
  items: MenuItem[];
  subscription : Subscription;

  constructor(
    private trainingService : TrainingService,
    private userService : UserService
  ) {

    this.items = [{
      label: "null" ,
      icon: 'fa fa-user',
      items: [
        {
          label: 'About Me',
          icon: 'pi pi-fw pi-user-plus',
          routerLink: ['profile/about-me'],
          routerLinkActiveOptions: { exact: true }
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-trash',
          routerLink: ['/login'],
          command: event=>{
          console.log("helo")
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("Username");
          localStorage.removeItem("UserId");
          this.trainingService.sendMessage(this.userService.getAuthentication());
          }
        }
      ],
    }]
  }

  ngOnInit(): void {
    this.subscription  = this.trainingService.getMessage().subscribe(res=>{
      console.log(51, res);
      if(res == "true"){
        this.loggedIn = true;
        let user = localStorage.getItem('Username');
        console.log(23, user)

        this.items[0].label = user!;

      }else{
        this.loggedIn = false;
      }
    })

    this.trainingService.sendMessage(this.userService.getAuthentication());

  }

}

