import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
  
  skillSearchForm: FormGroup;
  userList: any[] = [];
  appConstant = AppConstants;
  constructor(
    private fb: FormBuilder
    ) {
      this.skillSearchForm = this.fb.group({
        employee: [''],
        skill: [null],
      });
     }

  ngOnInit(): void {
    this.userList = [
      {
        Employee: 'Vineet',
        Project: 'Cloud Court',
        Skill: 'Javascript',
        SkillLevel: 'Advance',
        ProjectManager: 'Piyush',
        Status: 'Active'
      },
      {
        Employee: 'Vineet',
        Project:  'TnD',
        Skill:  'Angular',
        SkillLevel: 'Advance',
        ProjectManager: 'Piyush',
        Status: 'Active'
      },
      {
        Employee: 'Vineet',
        Project:  'ASE',
        Skill: 'NodeJs',
        SkillLevel: 'Advance',
        ProjectManager: 'Piyush',
        Status: 'Active'
      }
    ];
  }

  onSubmit() {

  }

  resetSearchForm() {

  }
}
