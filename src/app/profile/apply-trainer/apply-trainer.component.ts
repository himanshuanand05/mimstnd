import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-apply-trainer',
  templateUrl: './apply-trainer.component.html',
  styleUrls: ['./apply-trainer.component.scss']
})
export class ApplyTrainerComponent implements OnInit {
  applyTrainerForm: FormGroup;
  employeeList: any = [];
  skillsList: any = [];
  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService,
  ) {
    this.applyTrainerForm = this.fb.group({
      employee: [null, [Validators.required]],      
      skill: [null, [Validators.required]],      
    });
  }

  ngOnInit(): void { this.employeeList = [
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
