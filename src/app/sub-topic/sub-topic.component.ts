import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AddRecordComponent } from '../common/add-record/add-record.component';
import { LoaderOverlayService } from '../common/loader-overlay/loader-overlay.service';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-sub-topic',
  templateUrl: './sub-topic.component.html',
  styleUrls: ['./sub-topic.component.scss']
})
export class SubTopicComponent implements OnInit {

  subTopicForm : FormGroup;
  trainingId: string | null;
  subTopicList: any =[];
  latestResponse: any =[];
  subTopicDummyData = [{
    Id:'1', Name:"Sayem"
  },{
    Id:'2', Name:"Ashutosh"
  }]
  subscription: Subscription;


  constructor(
    public ref: DynamicDialogRef,
    public trainingService: TrainingService,
    private fb: FormBuilder,
    public dialogService: DialogService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderOverlayService: LoaderOverlayService
  ) {
    this.trainingId = '';
    this.subTopicForm = this.fb.group({
      subTopicId: [null, [Validators.required]]
    });

    this.subscription = this.trainingService.getMessage().subscribe(res =>{
      console.log(38, res)
      if(res?.Data?.ModuleSubTopicId){
        this.latestResponse = {
          Id: res.Data?.ModuleSubTopicId,
          Name: res.Data?.ModuleSubTopicName,
          Duration : res?.Data.Duration      
        }
      }
      this.subTopicForm.controls.subTopicId.setValue(res?.Data?.ModuleSubTopicId)
    })
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.trainingId = param.get('id');
      console.log('this.trainingId',this.trainingId);
      this.getsubTopics();
    });

    this.subTopicForm.controls.subTopicId.setValue(this.trainingService?.contentCreationData?.SubTopicObj?.Id)

  }

  getsubTopics(){
    try{
    this.loaderOverlayService.openLoader();
    this.trainingService.getContentCreationData(this.trainingService?.contentCreationData?.TopicObj?.Id, 'subTopic').subscribe(res =>{
     
      this.loaderOverlayService.removeLoader();
      this.subTopicList = res;
      console.log(76, res)
      
      if(this.latestResponse){
        this.subTopicList = this.subTopicList.concat(this.latestResponse)
      }
    })
  }catch(error){
    this.router.navigate(['content-creation/type']);
  }
  }

  onSubmit(){
    if(this.subTopicForm.invalid){
      return;
    }

    let trDoc:any = this.subTopicList.find((x:any) => x.Id == this.subTopicForm.value.subTopicId)
    this.trainingService.contentCreationData.SubTopicObj = trDoc;

    if(!this.trainingService.contentDuration){
      this.trainingService.contentDuration = trDoc.Duration;
    }

    this.messageService.add({ severity: 'success', summary: `Sub-Topic added successfully.` });
    setTimeout(() => {
      this.router.navigate(['/content-creation/review']);  
    }, 1000);
  }

  
  addRecord(data: any, compName: string) {
    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Add sub-Topic`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'subTopic', TopicId: this.trainingService.contentCreationData.TopicObj.Id}
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getsubTopics();
  });
  }

  back(){
    this.router.navigate(['content-creation/topic']);
  }

  clear(event : any, comp : string){
    this.trainingService.clearLabelData(comp);
  }

  editRecord(event : any, component : any){

    let trDoc: any = this.subTopicList.find((x: any) => x.Id == this.subTopicForm.value.subTopicId)
      this.trainingService.contentCreationData.SubTopicObj = trDoc;

      this.trainingService.isComingFromEditBox = true;
console.log(1333,this.subTopicList, this.trainingService.contentCreationData.SubTopicObj)
    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Edit Sub-Topic`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'editSubTopic', selectedValue: this.trainingService.contentCreationData.SubTopicObj,  ModuleTopicId: this.trainingService.contentCreationData.TopicObj.Id}
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getsubTopics();

    });
  }
}
