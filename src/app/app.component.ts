import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TrainingService } from './services/training.service';
import { UserService } from './services/users.service';
import { AppConstants } from './shared/app-constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'tndFrontend';
    sidebarMenuItems: MenuItem[] = [];
    display = false;
    subscription: Subscription;
    notLoggedIn: boolean = false;
    userId: any;
    constructor(
        private userService: UserService,
        private trainingService: TrainingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {

        this.subscription = this.trainingService.getMessage().subscribe(res => {
            console.log(29, res)
            if (res == 'true') {
                this.notLoggedIn = true;
                this.userId = localStorage.getItem('UserId');
                console.log(43, this.userId)
                this.userService.getNavigation(this.userId).subscribe((res:any)=>{  
                    console.log(37, res)   
                    console.log(38,JSON.parse(res)) 
                    this.sidebarMenuItems = JSON.parse(res);
                    })
            } else {
                this.notLoggedIn = false;
                this.display = false;
            }
        });


        //Get navigation response from backend
        // this.userId = localStorage.getItem('UserId');
        // console.log(43, this.userId)
        // this.userService.getNavigation(1).subscribe((res:any)=>{
        //     debugger;
        //     this.sidebarMenuItems = res;
        // })

        //get sidebar nav from backend
        // this.sidebarMenuItems = [
        //     {
        //         label: 'Dashboard',
        //         icon: 'pi pi-pw pi-desktop',
        //         routerLink: ['/dashboard'],
        //     },
        //     {
        //         label: 'Content',
        //         expanded: true,
        //         items: [
        //             {
        //                 label: 'List',
        //                 icon: 'pi pi-pi pi-bars',
        //                 routerLink: ['/list-content'],
        //             },
        //             {
        //                 label: AppConstants.CREATE_UPDATE,
        //                 icon: 'pi pi-pi pi-plus',
        //                 routerLink: ['/content-creation/type'],
        //             },
        //             {
        //                 label: 'Upload',
        //                 icon: 'pi pi-pi pi-upload',
        //                 routerLink: ['/upload-content'],
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Plan',
        //         expanded: true,
        //         items: [
        //             {
        //                 label: 'List',
        //                 icon: 'pi pi-pi pi-bars',
        //                 routerLink: ['/plan/list'],
        //             },
        //             {
        //                 label: AppConstants.CREATE_UPDATE,
        //                 icon: 'pi pi-pi pi-plus',
        //                 routerLink: ['/plan'],
        //                 routerLinkActiveOptions: { exact: true }
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Schedule',
        //         expanded: true,
        //         items: [
        //             {
        //                 label: 'List',
        //                 icon: 'pi pi-pi pi-bars',
        //                 routerLink: ['/schedule/list'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             {
        //                 label: AppConstants.CREATE_UPDATE,
        //                 icon: 'pi pi-pi pi-plus',
        //                 routerLink: ['/schedule/add'],
        //                 routerLinkActiveOptions: { exact: true }
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Feedback',
        //         icon: 'pi pi-pw pi-book',
        //         routerLink: ['/feedback'],
        //     },
        //     {
        //         label: 'Evaluation',
        //         icon: 'pi pi-pw pi-briefcase',
        //         routerLink: ['/evaluation'],
        //     },
        //     {
        //         label: 'Users',
        //         expanded: true,
        //         items: [
        //             {
        //                 label: 'List',
        //                 icon: 'pi pi-pi pi-bars',
        //                 routerLink: ['/user/list'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             //
        //             // {
        //             //     label: AppConstants.CREATE_UPDATE + ' User',
        //             //     icon: 'pi pi-pi pi-plus',
        //             // },
        //             {
        //                 label: AppConstants.CREATE_UPDATE + ' Role',
        //                 icon: 'pi pi-pi pi-plus',
        //                 routerLink: ['/user/role'],
        //                 routerLinkActiveOptions: { exact: true }

        //             }
        //         ]
        //     },
        //     {
        //         label: 'Skills',
        //         expanded: false,
        //         items: [
        //             {
        //                 label: 'List',
        //                 icon: 'pi pi-pi pi-bars',
        //                 routerLink: ['/skill/list'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             {
        //                 label: 'Add Skill Levels',
        //                 icon: 'pi pi-pi pi-plus-circle',
        //                 routerLink: ['/skill/add'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             {
        //                 label: 'Skill Upgrade',
        //                 icon: 'pi pi-pi pi-arrow-up',
        //                 routerLink: ['/skill/upgrade'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             {
        //                 label: 'Approve Skill',
        //                 icon: 'pi pi-pi pi-check-circle',
        //                 routerLink: ['/skill/approve'],
        //                 routerLinkActiveOptions: { exact: true }
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Request',
        //         expanded: false,
        //         items: [
        //             {
        //                 label: 'Apply Trainer',
        //                 icon: 'pi pi-pi pi-plus-circle',
        //                 routerLink: ['/profile/apply-trainer'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             {
        //                 label: 'Apply Training',
        //                 icon: 'pi pi-pi pi-plus-circle',
        //                 routerLink: ['/profile/apply-training'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             {
        //                 label: 'Approve Trainer',
        //                 icon: 'pi pi-pi pi-check-circle',
        //                 routerLink: ['/profile/approve-trainer'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             {
        //                 label: 'Approve Training',
        //                 icon: 'pi pi-pi pi-check-circle',
        //                 routerLink: ['/profile/approve-training'],
        //                 routerLinkActiveOptions: { exact: true }
        //             },
        //             // {
        //             //     label: 'About Me',
        //             //     icon: 'pi pi-pi pi-info-circle',
        //             //     routerLink: ['/profile/about-me'],
        //             //     routerLinkActiveOptions: { exact: true }
        //             // }
        //         ]
        //     },
        //     {
        //         label: 'Training Needs',
        //         expanded: false,
        //         items: [
        //             {
        //                 label: 'Need Trainings',
        //                 icon: 'pi pi-pi pi-plus-circle',
        //                 routerLink: ['/need-training'],
        //                 routerLinkActiveOptions: { exact: true }

        //             },
        //             {
        //                 label: 'Approve Needs',
        //                 icon: 'pi pi-pi pi-check-circle',
        //                 routerLink: ['/approve-need'],
        //                 routerLinkActiveOptions: { exact: true }

        //             },
        //             {
        //                 label: 'List Needs',
        //                 icon: 'pi pi-pi pi-bars',
        //                 routerLink: ['/list-need'],
        //                 routerLinkActiveOptions: { exact: true }

        //             }
        //         ]
        //     },
        //     {
        //         label: 'Report',
        //         icon: 'pi pi-pw pi-id-card',
        //     },
        // ];
    }
}
