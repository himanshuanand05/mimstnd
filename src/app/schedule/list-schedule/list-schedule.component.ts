import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/shared/app-constants';
import { ConfirmationService } from 'primeng/api';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.scss']
})
export class ListScheduleComponent implements OnInit {

  searchScheduleForm : FormGroup = this.fb.group({
    scheduleName: [null, [Validators.required]],
    status: [null, [Validators.required]],
  })

  scheduleList: any[] = [];
  list: any[];
  appConstant = AppConstants;
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private trainingService: TrainingService,
  ) { }

  ngOnInit(): void {
    this.getScheduleList();

    this.list = [
      {"id":1, "Name":"Sayem"},
      {"id":2, "Name":"Vineet"},
    ]
  }

  getScheduleList() {
    this.trainingService.getTrainingScheduleList().subscribe((res:any)=>{
      console.log(res, 24);
      this.scheduleList = res
    })
  }
  
  onSubmit(){

  }

  removeSchedule() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to deactivate this Training content?',
      accept: () => {
        this.scheduleList = [];
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

}
