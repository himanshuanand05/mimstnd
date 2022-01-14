import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-approve-training',
  templateUrl: './approve-training.component.html',
  styleUrls: ['./approve-training.component.scss']
})
export class ApproveTrainingComponent implements OnInit {

  approveTrainingSearchForm: FormGroup;
  appConstant = AppConstants;
  trainingList: any = [];
  skillList: any = [];
  rows = 10;
  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService,
  ) {
    this.approveTrainingSearchForm = this.fb.group({
      employee: [null],
      skill: [null],
    });
   }

  ngOnInit(): void {
    this.trainingList = this.getApproveTrainer();
  }

  onSubmit() {

  }

  approve(user: any) {

  }

  resetSearchForm() {

  }
  
  getApproveTrainer() {
    return  [
      { Id:1, Employee: "Sayem", Plan: "Basic Angular Fresher", SkillName: "Angular", 
      TrainingModuleName: "Module 1", ModuleTopicName: "Basic Angular", ModuleSubTopicName: "Introduction, Two Way Binding and Component", 
      StartDatetime: new Date(), EndDatetime: new Date(), Trainer: "Vineet"},
      { Id:1, Employee: "Abhishek", Plan: "Advance Angular Fresher", SkillName: "Angular", 
      TrainingModuleName: "Module 2", ModuleTopicName: "Advance Angular", ModuleSubTopicName: "Introduction, Two Way Binding and Component", 
      StartDatetime: new Date(), EndDatetime: new Date(), Trainer: "Vineet"},
    ];
  }

}