import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {MenubarModule} from 'primeng/menubar';
import {DialogService, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import HttpCustomInterceptor from './services/http-custom-interceptor';
import { TrainingService } from './services/training.service';
import {StepsModule} from 'primeng/steps';
import { ContentCreationComponent } from './content-creation/content-creation.component';
import { SkillsComponent } from './skills/skills.component';
import { TrainingTypeComponent } from './training-type/training-type.component';
import { DomainComponent } from './domain/domain.component';
import { AddRecordComponent } from './common/add-record/add-record.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ModuleComponent } from './module/module.component';
import { TopicComponent } from './topic/topic.component';
import { SubTopicComponent } from './sub-topic/sub-topic.component';
import {CardModule} from 'primeng/card';
import { ReviewComponent } from './review/review.component';
import { ListContentCreationComponent } from './content-creation/list-content-creation/list-content-creation.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { UploadContentCreationComponent } from './content-creation/upload-content-creation/upload-content-creation.component';
import { PlanComponent } from './plan/plan.component';
import {TreeModule} from 'primeng/tree';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListPlanComponent } from './plan/list-plan/list-plan.component';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {PanelMenuModule} from 'primeng/panelmenu';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddScheduleComponent } from './schedule/add-schedule/add-schedule.component';
import {CalendarModule as CalendarModulePrimeng} from 'primeng/calendar';
import { ListScheduleComponent } from './schedule/list-schedule/list-schedule.component';
import { FeedbackComponent } from './feedback/feedback.component';
import {PanelModule} from 'primeng/panel';
import {RatingModule} from 'primeng/rating';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { RoleComponentComponent } from './user/role-component/role-component.component';
import { UserComponent } from './user/user.component';
import {AccordionModule} from 'primeng/accordion';
import { ListUserComponentComponent } from './user/list-user-component/list-user-component.component';
import { SkillUpgradeComponent } from './skills/skill-upgrade/skill-upgrade.component';
import { SkillLayoutComponent } from './skills/skill-layout/skill-layout.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {SelectButtonModule} from 'primeng/selectbutton';
import { SkillListComponent } from './skills/skill-list/skill-list.component';
import { SkillAddComponent } from './skills/skill-add/skill-add.component';
import { SkillApproveComponent } from './skills/skill-approve/skill-approve.component';
import { MinToHoursPipe } from './pipes/min-to-hours.pipe';
import { ApplyTrainerComponent } from './profile/apply-trainer/apply-trainer.component';
import { ProfileLayoutComponent } from './profile/profile-layout/profile-layout.component';
import { ApplyTrainingComponent } from './profile/apply-training/apply-training.component';
import {TooltipModule} from 'primeng/tooltip';
import { ApproveTrainerComponent } from './profile/approve-trainer/approve-trainer.component';
import { ApproveTrainingComponent } from './profile/approve-training/approve-training.component';
import { AboutMeComponent } from './profile/about-me/about-me.component';
import { NeedTrainingComponent } from './need-training/need-training.component';
import { ApproveNeedComponent } from './approve-need/approve-need.component';
import { ListNeedComponent } from './list-need/list-need.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TrainingTypeComponent,
    DomainComponent,
    ContentCreationComponent,
    SkillsComponent,
    AddRecordComponent,
    ModuleComponent,
    TopicComponent,
    SubTopicComponent,
    ReviewComponent,
    ListContentCreationComponent,
    HeaderComponent,
    UploadContentCreationComponent,
    PlanComponent,
    FooterComponent,
    ListPlanComponent,
    ScheduleComponent,
    AddScheduleComponent,
    ListScheduleComponent,
    FeedbackComponent,
    EvaluationComponent,
    RoleComponentComponent,
    UserComponent,
    ListUserComponentComponent,
    SkillUpgradeComponent,
    SkillLayoutComponent,
    SkillListComponent,
    SkillAddComponent,
    SkillApproveComponent,
    MinToHoursPipe,
    ApplyTrainerComponent,
    ProfileLayoutComponent,
    ApplyTrainingComponent,
    ApproveTrainerComponent,
    ApproveTrainingComponent,
    AboutMeComponent,
    NeedTrainingComponent,
    ApproveNeedComponent,
    ListNeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule,
    StepsModule,
    RadioButtonModule,
    CardModule,
    InputSwitchModule,
    TreeModule,
    MenubarModule,
    ButtonModule,
    ConfirmDialogModule,
    SidebarModule,
    PanelMenuModule,
    CalendarModulePrimeng,
    PanelModule,
    RatingModule,
    AccordionModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    SelectButtonModule,
    TooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInterceptor,
      multi: true
    },
    MessageService,
    DialogService,
    DynamicDialogRef,
    TrainingService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
