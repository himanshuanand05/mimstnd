import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppConstants, MessageConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-skill-approve',
  templateUrl: './skill-approve.component.html',
  styleUrls: ['./skill-approve.component.scss']
})
export class SkillApproveComponent implements OnInit {
  skillSearchForm: FormGroup;
  appConstant = AppConstants;
  userList: any[] = [];
  ratingList = [
    { Title: 1},
    { Title: 2},
    { Title: 3},
    { Title: 4},
    { Title: 5},
  ]
  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.skillSearchForm = this.fb.group({
      employee: ['']
    });
   }

  ngOnInit(): void {
    this.userList = [
      {
        Employee: 'John',
        Skill: 'NodeJs',
        CurrentSkill: 'Intermediate',
        AppliedSkill: 'Advanced',
        Rating: 1,
        Feedback: '',
        Status: 'Active'
      },
      {
        Employee: 'Alice',
        Skill: 'ReactJs',
        CurrentSkill: 'Beginner',
        AppliedSkill: 'Intermediate',
        Rating: 1,
        Feedback: '',
        Status: 'Active'
      },
      {
        Employee: 'Bob',
        Skill: 'Angular',
        CurrentSkill: 'Intermediate',
        AppliedSkill: 'Advanced',
        Rating: 1,
        Feedback: '',
        Status: 'Active'
      }
    ];
  }

  onSubmit() {

  }

  resetSearchForm() {

  }

  approve(user: any) {
    this.confirmationService.confirm({
      message: MessageConstants.SKILL_APPROVE_CONFIRMATION,
      accept: () => {
        console.log(user);
      },
      reject: () => {
      }
    });
  }

  reject(user: any) {
    if (user.Rating < 3) {
      this.messageService.clear();
      return this.messageService.add({ severity: 'warn', summary: MessageConstants.FEEDBACK_REQUIRED });
    }
  }

  onRatingChange(user: any) {
    console.log(user)
  }
}
