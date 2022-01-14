import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-skill-upgrade',
  templateUrl: './skill-upgrade.component.html',
  styleUrls: ['./skill-upgrade.component.scss']
})
export class SkillUpgradeComponent implements OnInit {

  skillUpgradeForm: FormGroup;
  employeeList: any = [];
  skillsList: any = [];
  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService,
  ) {
    this.skillUpgradeForm = this.fb.group({
      // employee: [null, [Validators.required]],      
      skill: [null, [Validators.required]],      
    });
   }

  ngOnInit(): void {
    this.employeeList = [
      { Id: 1, Name: 'Vineet'}
    ];

    this.skillsList = [
      { Id: 1, Name: 'Javascript'}
    ]
  }

  get f() {
    return this.skillUpgradeForm.controls;
  }

  submit() {
    this.confirmationService.confirm({
      message: MessageConstants.UPGRADE_SKILL_CONFIRMATION,
      accept: () => {
        console.log(this.skillUpgradeForm.value);
      },
      reject: () => {
      }
    });

  }

}
