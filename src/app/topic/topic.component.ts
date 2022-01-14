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
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  topicForm: FormGroup;
  trainingId: string | null;
  topicList: any = [];
  latestResponse: any = [];
  subscription: Subscription

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
    this.topicForm = this.fb.group({
      topicId: [null, [Validators.required]]
    })

    this.subscription = this.trainingService.getMessage().subscribe(res =>{
      if(res?.Data?.ModuleTopicId){
        this.latestResponse = {
          Id: res.Data?.ModuleTopicId,
          Name: res.Data?.ModuleTopicName      
        }
      }
      this.topicForm.controls.topicId.setValue(res?.Data?.ModuleTopicId)
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.trainingId = param.get('id');
      console.log('this.trainingId', this.trainingId);
      this.getTopics();
    });

    this.topicForm.controls.topicId.setValue(this.trainingService?.contentCreationData?.TopicObj?.Id)

  }

  getTopics() {
    try{
    this.loaderOverlayService.openLoader();
    this.trainingService.getContentCreationData(this.trainingService.contentCreationData.ModuleObj.Id, 'topic').subscribe(res => {
      console.log(50, res);
      this.loaderOverlayService.removeLoader();
      this.topicList = res;

      if(this.latestResponse){
            this.topicList = this.topicList.concat(this.latestResponse)
          }

      // this.topicList = this.topicList.map((item:any) =>{
      //   item.Name = item.Name + " - " + item.Duration + " mins";
      //   return item;
      // })
    })
  }catch(error){
    this.router.navigate(['content-creation/type']);
  }
  }

  onSubmit() {
    if (this.topicForm.invalid) {
      return;
    }

    let trDoc:any = this.topicList.find((x:any) => x.Id == this.topicForm.value.topicId)
    this.trainingService.contentCreationData.TopicObj = trDoc;

    this.messageService.add({ severity: 'success', summary: `Topic added successfully.` });
    setTimeout(() => {
      this.router.navigate(['/content-creation/sub-topic']);
    }, 1000);
  }

  addRecord(data: any, compName: string) {
    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Add Topic`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'Topic', ModuleId :this.trainingService.contentCreationData.ModuleObj.Id }
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getTopics();
    });
  }

  back(){
    this.router.navigate(['content-creation/module']);
  }

  clear(event : any, comp : string){
    this.trainingService.clearLabelData(comp);
  }

  editRecord(event : any, component : any){

    let trDoc: any = this.topicList.find((x: any) => x.Id == this.topicForm.value.topicId)
      this.trainingService.contentCreationData.TopicObj = trDoc;

      this.trainingService.isComingFromEditBox = true;

    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Edit Topic`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'editTopic', selectedValue: this.trainingService.contentCreationData.TopicObj,  ModuleId: this.trainingService.contentCreationData.ModuleObj.Id}
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getTopics();

    });
  }

}
