import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  appConstant = AppConstants;
  userList: any = [];
  constructor() { }

  ngOnInit(): void {
    this.userList = [
      {
        Skill: 'Javascript',
        SkillLevel: 'Advance',
        IsTrainer: 'Yes'
      },
      {
        Skill:  'Angular',
        SkillLevel: 'Advance',
        ProjectManager: 'Piyush',
        IsTrainer: 'Yes'
      },
      {
        Skill: 'NodeJs',
        SkillLevel: 'Advance',
        IsTrainer: 'No'
      }
    ];
  }

}
