import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TrainingService } from 'src/app/services/training.service';
import { MessageConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  evaluationdateValidation: Date;
  endDateTime: Date;
  projectId: any;
  skillId: any;
  sessionList: any[] = [{ Id: 1, Name: 'Data 1' }];
  planList: any[];
  trainerList: any = [];
  trainerCheckboxList: any = [];
  participantsList: any = [];
  participantCheckboxList: any= [];
  evaluatorsList: any = [];
  addScheduleForm: FormGroup;
  venueList: any[] = [];
  checkTrainer: boolean;
  checkParticipants: boolean;
  planDuration:number;

  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    this.addScheduleForm = this.fb.group({
      name: ['', [Validators.required]],
      sessions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getAllTrainers();
    this.getVenueTypeList();
    this.addSessionSection();
    this.getTrainingPlanList();
    
    console.log(47, this.sessions.controls[0].value)
    
  }


  get sessions(): FormArray {
    return this.addScheduleForm.get('sessions') as FormArray;
  }

  newSession(): FormGroup {
    return this.fb.group({
      planId: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      startDatetime: [null, [Validators.required]],
      endDatetime: [null, [Validators.required]],
      trainerId: [ null , [Validators.required]],
      trainerListing : [null, [Validators.required]],
      TrainersChecked: [true, [Validators.required]],
      participants: [null, [Validators.required]],
      // Participants: [null, [Validators.required]],
      venueTypeId: [null, [Validators.required]],
      evaluators: [null, [Validators.required]],
      evaluationDate: [null, [Validators.required]],
    });
  }

  addSessionSection() {
    this.sessions.push(this.newSession());
  }

  removeSessionSection(i: number) {
    this.confirmationService.confirm({
      message: MessageConstants.REMOVE_SESSION_CONFIRMATION,
      accept: () => {
        this.sessions.removeAt(i);
      }
    });
  }

  getTrainingPlanList() {
    this.trainingService.getPlanListing().subscribe((res: any) => {
      console.log(77, res);
      this.planList = res;
    })
  }

  onSubmit() {
    console.log(71, this.addScheduleForm.value);
    this.trainingService.addTrainingSchedule(this.addScheduleForm.value).subscribe((res: any) => {
      console.log(68, res);
      if (res.StatusCode == 200) {
        this.messageService.add({ severity: 'success', summary: `Training Schedule added successfully.` });
        setTimeout(() => {
          this.router.navigate(['schedule/list']);
        }, 1000)
      }
    })
  }

  getVenueTypeList() {
    this.trainingService.getVenueTypeList().subscribe((res: any) => {
      this.venueList = res;
    })
  }

  async getValue(id: any, session : number) {
    console.log("heyyy", id, session)

    let selectedValue = this.planList.filter((item: any) => {
      return item.TrainingPlanId == id;
    })
    this.projectId = selectedValue[0]?.ProjectId;
    this.skillId = selectedValue[0]?.PlanData[0]?.SkillId;

    this.planDuration = selectedValue[0].planDuration;
    
    if (selectedValue.some(selectedValue => selectedValue.ProjectName)) {
      console.log(111, selectedValue)

      //call API ------  getTrainers?projectId='obj.projectId'
      let response = await this.trainingService.getTrainers(this.projectId, this.skillId).toPromise();
      this.trainerList[session] = response

      //call API ------  getParticipants?projectId='obj.projectId'
      let participantResponse = await this.trainingService.getParticipants(this.projectId, this.skillId).toPromise();
      this.participantsList[session] = participantResponse

      this.trainerCheckboxList[session] = true;
      this.participantCheckboxList[session] = true;
    } else {
      //call API ------- getTrainers?projectId=0
      this.projectId = 0;
      this.skillId=0;
      let response = await this.trainingService.getTrainers(this.projectId, this.skillId).toPromise();
      this.trainerList[session] = response

      //call API ------- getParticipants?projectId=0
      let participantResponse = await this.trainingService.getParticipants(this.projectId, this.skillId).toPromise();
      this.participantsList[session] = participantResponse
    }

    this.getEvaluators(session,this.projectId, this.skillId);
  }

  async changeTrainerValues(event: any, session:number) {
    console.log(135, event, session)
    try {
      if (!event) {
        let projectId = 0;
        let response = await this.trainingService.getTrainers(projectId, this.skillId).toPromise();
        this.trainerList[session] = response
      } else {
        let response = await this.trainingService.getTrainers(this.projectId, this.skillId).toPromise();
        this.trainerList[session] = response
      }
    } catch (e) {
      console.log(146, e)
    }
  }

  async changeParticipantValues(event: any, session:number) {
    if (!event) {
      console.log(161)
      let projectId = 0;
      let participantResponse = await this.trainingService.getParticipants(projectId, this.skillId).toPromise();
      this.participantsList[session] = participantResponse
    } else {
      let participantResponse = await this.trainingService.getParticipants(this.projectId, this.skillId).toPromise();
      this.participantsList[session] = participantResponse
    }

    if(this.addScheduleForm.value.sessions[0].trainerId && !event){
      console.log(153, this.addScheduleForm.value.sessions[0].trainerId)
      let participantResponse = await this.trainingService.getParticipants(0,0).toPromise();
      this.participantsList[session] = participantResponse;

      this.participantsList[session] = this.participantsList[session].filter((item:any)=>{
        return item.EmployeeId != this.addScheduleForm.value.sessions[0].trainerId;
      })
      console.log(160, this.participantsList[session])
    }

    if(this.addScheduleForm.value.sessions[0].trainerId && event){
      let participantResponse = await this.trainingService.getParticipants(this.projectId, this.skillId).toPromise();
      this.participantsList[session] = participantResponse

      this.participantsList[session] = this.participantsList[session].filter((item:any)=>{
        return item.EmployeeId != this.addScheduleForm.value.sessions[0].trainerId;
      })
      console.log(188, this.participantsList[session])


    }

  }

  async getParcipantsOtherthanTrainer(event:any, session : number){
    console.log(200, event, this.participantsList[session])

    if(event){
      let selectedTrainer = this.addScheduleForm.value.sessions[0].trainerId;

      this.participantsList[session] = this.participantsList[session].filter((item:any)=>{
        return item.EmployeeId != event 
      })
      console.log(169, this.participantsList)
    }else{
      let participantResponse = await this.trainingService.getParticipants(this.projectId, this.skillId).toPromise();
      this.participantsList[session] = participantResponse

    }
  }

  async getEvaluators(session:number,projectId:any, skillId:any){
    console.log(195, projectId, skillId)
    let response = await this.trainingService.getTrainers(this.projectId, this.skillId).toPromise();
      this.evaluatorsList[session] = response;

      let res = await this.trainingService.getEvaluators(this.projectId).toPromise();
      console.log(201, res)

      this.evaluatorsList[session] =  this.evaluatorsList[session].concat(res);
      console.log(204,this.evaluatorsList)

  }

  setEvaluationDate(){
    this.evaluationdateValidation = this.addScheduleForm.value.sessions[0].endDatetime

    this.evaluationdateValidation?.setDate(this.evaluationdateValidation.getDate()+1)
  }

  setEndDateTime(){
    this.endDateTime = this.addScheduleForm.value.sessions[0].startDatetime
    this.endDateTime?.setDate(this.endDateTime.getDate()+1)
  }

  getAllTrainers() {
    //Trainer API
  }
}
