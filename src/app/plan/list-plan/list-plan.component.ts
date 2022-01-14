import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TrainingService } from 'src/app/services/training.service';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-list-plan',
  templateUrl: './list-plan.component.html',
  styleUrls: ['./list-plan.component.scss']
})
export class ListPlanComponent implements OnInit {

searchPlanForm : FormGroup = this.fb.group({
  planName: [null, [Validators.required]],
  projectName: [null, [Validators.required]],
  status: [null, [Validators.required]],
})

  planList: any[];
  list : any[];
  switchedOff : boolean = false;
  appConstant = AppConstants;
  constructor(
    private fb : FormBuilder,
    private trainingService: TrainingService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.init();

    
    this.planList = [
      {"id":1, "Name":"Sayem"},
      {"id":2, "Name":"Vineet"},
    ]

    this.list = [
      {"id":1, "Name":"Sayem"},
      {"id":2, "Name":"Vineet"},
    ]
  }

  async init() {
    let response : any = await this.trainingService.getPlanListing().toPromise();
    console.log(26,response)
    
    this.planList = response
    console.log(29,this.planList)

  }

  onSubmit(){

  }

  changeStatus(value: any, plan: any){

    this.confirmationService.confirm({
      message: 'Are you sure that you want to change the state of this Training Plan?',
      accept: () => {
        if(!this.switchedOff){   //In case of Deactivating
          let obj = {
            trainingPlanId : value,
            statusId : AppConstants.TRAINING_PLAN_DEACTIVE,
          }
          this.trainingService.changeTrainingPlanStatus(obj).subscribe((res:any)=>{
            this.switchedOff = true
          })
        }else {   //In case of Activating
          let obj = {
            TrainingPlanId : value,
            StatusId : AppConstants.TRAINING_PLAN_ACTIVE,
          }
          this.trainingService.changeTrainingPlanStatus(obj).subscribe((res:any)=>{
            this.switchedOff = false;
          })

        }
      },
      reject: () => {
        console.log(60,plan);
        plan.Status='Active'
      }
    });
  }

  remove(TrainingPlanId: number){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to deactivate this Training Plan?',
      accept: () => {
        console.log(122, TrainingPlanId);
        this.planList = this.planList.filter(res=>{
          return res.TrainingPlanId != TrainingPlanId;
        })
      },
      reject: () => {
        console.log(122, "rejected")
      }
    });
  }

  clear(event: any, value: any){

  }

  resetSearchForm(){

  }
}
