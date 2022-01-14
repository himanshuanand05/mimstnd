import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from '../shared/app-constants';

@Component({
  selector: 'app-need-training',
  templateUrl: './need-training.component.html',
  styleUrls: ['./need-training.component.scss']
})
export class NeedTrainingComponent implements OnInit {
  applyTrainerForm: FormGroup;
  employeeList: any = [];
  skillsList: any = [];

  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService,
  ) { 
    this.applyTrainerForm = this.fb.group({
      objective: [null, [Validators.required]],      
      expectation: [null, [Validators.required]],      
      project: [null, [Validators.required]],      
    });
  }

  ngOnInit(): void {
    this.employeeList = [
      { Id: 1, Name: 'Vineet'}
    ];
  
    this.skillsList = [
      { Id: 1, Name: 'Javascript'}
    ];
  }

  get f() {
    return this.applyTrainerForm.controls;
  }
  
  submit() {
    this.confirmationService.confirm({
      message: MessageConstants.APPLY_TRAINER_CONFIRMATION,
      accept: () => {
        console.log(this.applyTrainerForm.value);
      },
      reject: () => {
      }
    });
  
  }
}
