import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-list-user-component',
  templateUrl: './list-user-component.component.html',
  styleUrls: ['./list-user-component.component.scss']
})
export class ListUserComponentComponent implements OnInit {

  userSearchForm: FormGroup;
  appConstant = AppConstants;
  userList: any[] = [];
  tpoList: any[] = [];

  constructor(
    private fb: FormBuilder
  ) {
    this.userSearchForm = this.fb.group({
      employee: [''],
      role: [null],
      status: [null],
    });
  }

  ngOnInit(): void {
    this.tpoList = [
      {
        Employee: 'Vineet',
      },
      {
        Employee: 'Harsh',
      },
      {
        Employee: 'Sayem',
      }
    ];
    this.userList = [
      {
        Employee: 'Vineet',
        Project: 'Cloud Court',
        Skill: 'Javascript',
        ProjectManager: 'Piyush',
        Status: 'Active'
      },
      {
        Employee: 'Vineet',
        Project:  'TnD',
        Skill:  'Angular',
        ProjectManager: 'Piyush',
        Status: 'Active'
      },
      {
        Employee: 'Vineet',
        Project:  'ASE',
        Skill: 'NodeJs',
        ProjectManager: 'Piyush',
        Status: 'Active'
      }
    ]
  }

  onSubmit() {

  }

  resetSearchForm() {

  }
}
