import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-skill-add',
  templateUrl: './skill-add.component.html',
  styleUrls: ['./skill-add.component.scss']
})
export class SkillAddComponent implements OnInit {
  skillAddForm: FormGroup;
  employeeList: any = [];
  skillsList: any = [];
  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService,
  ) {
    this.skillAddForm = this.fb.group({
      employee: [null, [Validators.required]],      
      skill: [null, [Validators.required]],      
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
    return this.skillAddForm.controls;
  }

  submit() {
    this.confirmationService.confirm({
      message: MessageConstants.ADD_SKILL_CONFIRMATION,
      accept: () => {
        console.log(this.skillAddForm.value);
      },
      reject: () => {
      }
    });

  }
}
