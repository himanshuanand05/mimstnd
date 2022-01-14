import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-approve-trainer',
  templateUrl: './approve-trainer.component.html',
  styleUrls: ['./approve-trainer.component.scss']
})
export class ApproveTrainerComponent implements OnInit {

  approveTrainerSearchForm: FormGroup;
  appConstant = AppConstants;
  userList: any = [];
  skillList: any = [];
  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService,
  ) {
    this.approveTrainerSearchForm = this.fb.group({
      employee: [null],
      skill: [null],
    });
   }

  ngOnInit(): void {
    this.userList = this.getApproveTrainer();
  }

  onSubmit() {

  }

  approve(user: any) {

  }

  resetSearchForm() {

  }
  
  getApproveTrainer() {
    return  [
      {
        Employee: 'John',
        Skill: 'NodeJs',
        CurrentSkill: 'Advance',
      },
      {
        Employee: 'Alice',
        Skill: 'ReactJs',
        CurrentSkill: 'Advance',
      },
      {
        Employee: 'Bob',
        Skill: 'Angular',
        CurrentSkill: 'Individual Contributor',
      }
    ];
  }

}
