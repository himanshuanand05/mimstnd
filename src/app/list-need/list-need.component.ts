import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/shared/app-constants';


@Component({
  selector: 'app-list-need',
  templateUrl: './list-need.component.html',
  styleUrls: ['./list-need.component.scss']
})
export class ListNeedComponent implements OnInit {
  
  trainingList: any[] = [];
  appConstant = AppConstants;
  rows = 10;

  constructor(
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.trainingList = [
      { Id:1, RequestedBy: "Sayem Khan", RequestedDate: new Date(), 
      DecisionDate: new Date(), Objective: "To have a basic understanding of ML & AI", Expectation: "Should be able to make a ML models", 
      Projects: "T&D Automation", Comments: new Date(), Status: "Approved"},
      { Id:1, RequestedBy: "Piyush Gupta", RequestedDate: new Date(), 
      DecisionDate: new Date(), Objective: "Getting familiar with  Oracle", Expectation: "Able to understand and write oracle queries ", 
      Projects: "T&D Automation", Comments: new Date(), Status: "Applied"}
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
