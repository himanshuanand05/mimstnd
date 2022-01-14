import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentCreationComponent } from './content-creation/content-creation.component';
import { SkillsComponent } from './skills/skills.component';
import { TrainingTypeComponent } from './training-type/training-type.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DomainComponent } from './domain/domain.component';
import { ModuleComponent } from './module/module.component';
import { TopicComponent } from './topic/topic.component';
import { SubTopicComponent } from './sub-topic/sub-topic.component';
import { ReviewComponent } from './review/review.component';
import { ListContentCreationComponent } from './content-creation/list-content-creation/list-content-creation.component';
import { UploadContentCreationComponent } from './content-creation/upload-content-creation/upload-content-creation.component';
import { PlanComponent } from './plan/plan.component';
import { ListPlanComponent } from './plan/list-plan/list-plan.component';
import { AddScheduleComponent } from './schedule/add-schedule/add-schedule.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ListScheduleComponent } from './schedule/list-schedule/list-schedule.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { UserComponent } from './user/user.component';
import { RoleComponentComponent } from './user/role-component/role-component.component';
import { ListUserComponentComponent } from './user/list-user-component/list-user-component.component';
import { SkillLayoutComponent } from './skills/skill-layout/skill-layout.component';
import { SkillUpgradeComponent } from './skills/skill-upgrade/skill-upgrade.component';
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { SkillListComponent } from './skills/skill-list/skill-list.component';
import { SkillAddComponent } from './skills/skill-add/skill-add.component';
import { SkillApproveComponent } from './skills/skill-approve/skill-approve.component';
import { ProfileLayoutComponent } from './profile/profile-layout/profile-layout.component';
import { ApplyTrainerComponent } from './profile/apply-trainer/apply-trainer.component';
import { ApplyTrainingComponent } from './profile/apply-training/apply-training.component';
import { ApproveTrainerComponent } from './profile/approve-trainer/approve-trainer.component';
import { ApproveTrainingComponent } from './profile/approve-training/approve-training.component';
import { AboutMeComponent } from './profile/about-me/about-me.component';
import { NeedTrainingComponent } from './need-training/need-training.component'
import { ApproveNeedComponent } from './approve-need/approve-need.component'; 
import { ListNeedComponent } from './list-need/list-need.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'content-creation', 
    component: ContentCreationComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'type', component: TrainingTypeComponent},
      { path: 'type/:id', component: TrainingTypeComponent},
      { path: 'domain', component: DomainComponent},
      { path: 'skill', component: SkillsComponent},
      { path: 'module', component: ModuleComponent},
      { path: 'topic', component: TopicComponent},
      { path: 'sub-topic', component: SubTopicComponent},
      { path: 'review', component:ReviewComponent},
    ] 
  },
  { path: 'list-content', component: ListContentCreationComponent, canActivate: [AuthGuard]},
  { path: 'upload-content', component: UploadContentCreationComponent, canActivate: [AuthGuard]},
  { path: 'plan', component: PlanComponent, canActivate: [AuthGuard]},
  { path: 'plan/list', component: ListPlanComponent, canActivate: [AuthGuard]},
  { path: 'plan/update/:id', component: PlanComponent, canActivate: [AuthGuard]},
  { path: 'schedule', 
    component: ScheduleComponent, 
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'add', component: AddScheduleComponent},
      { path: 'list', component: ListScheduleComponent},
      { path: 'update/:id', component: AddScheduleComponent},
    ]
  },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard]},
  { path: 'evaluation', component: EvaluationComponent, canActivate: [AuthGuard]},
  { path: 'user', 
    component: UserComponent, 
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'list', component: ListUserComponentComponent},
      { path: 'role', component: RoleComponentComponent},
    ]
  },
  { path: 'skill', 
    component: SkillLayoutComponent, 
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'list', component: SkillListComponent},
      { path: 'add', component: SkillAddComponent},
      { path: 'upgrade', component: SkillUpgradeComponent},
      { path: 'approve', component: SkillApproveComponent},
    ]
  },
  { path: 'profile', 
    component: ProfileLayoutComponent, 
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'apply-trainer', component: ApplyTrainerComponent},
      { path: 'apply-training', component: ApplyTrainingComponent},
      { path: 'approve-trainer', component: ApproveTrainerComponent},
      { path: 'approve-training', component: ApproveTrainingComponent},
      { path: 'about-me', component: AboutMeComponent},
    ]
  },
  { path: 'need-training', component: NeedTrainingComponent, canActivate: [AuthGuard]},
  { path: 'approve-need', component: ApproveNeedComponent, canActivate: [AuthGuard]},
  { path: 'list-need', component: ListNeedComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
