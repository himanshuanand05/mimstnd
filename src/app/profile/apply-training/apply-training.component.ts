import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TrainingService } from 'src/app/services/training.service';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-apply-training',
  templateUrl: './apply-training.component.html',
  styleUrls: ['./apply-training.component.scss']
})
export class ApplyTrainingComponent implements OnInit {

  
  searchApplyTrainingForm : FormGroup;

  trainingList: any[] = [];
  list: any[];
  appConstant = AppConstants;
  rows = 10;
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private trainingService: TrainingService,
  ) { 
    this.searchApplyTrainingForm = this.fb.group({
      planName: [null],
      skill: [null],
      startDate: [null],
      endDate: [null],
      trainer: [null],
    })
  }
  ngOnInit(): void {
    this.trainingList = [
      { Id:1, Name: "Sayem", Plan: "Basic Angular Fresher", SkillName: "Angular", 
      TrainingModuleName: "Module 1", ModuleTopicName: "Basic Angular", ModuleSubTopicName: "Introduction, Two Way Binding and Component", 
      StartDatetime: new Date(), EndDatetime: new Date(), Trainer: "Vineet"},
      { Id:1, Name: "Sayem", Plan: "Advance Angular Fresher", SkillName: "Angular", 
      TrainingModuleName: "Module 2", ModuleTopicName: "Advance Angular", ModuleSubTopicName: "Introduction, Two Way Binding and Component", 
      StartDatetime: new Date(), EndDatetime: new Date(), Trainer: "Vineet"},
    ]
  }
  
  onSubmit(){

  }

  removeSchedule() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to deactivate this Training content?',
      accept: () => {
      },
      reject: () => {
        console.log(76, "rejected")
      }
    });
  }

  clear(event: any, value: any){

  }

  resetSearchForm(){

  }

  approve(training: any) {

  }
}
