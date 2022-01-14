import { ThisReceiver } from '@angular/compiler';
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
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  moduleForm: FormGroup;
  trainingId: string | null;
  moduleList: any = [];
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
    this.moduleForm = this.fb.group({
      moduleId: [null, [Validators.required]]
    })

    this.subscription = this.trainingService.getMessage().subscribe(res =>{
      console.log(41, res)
      if(res?.Data?.TrainingModuleId){
        this.latestResponse = {
          Id: res.Data?.TrainingModuleId,
          Name: res.Data?.TrainingModuleName      
        }
      }
      this.moduleForm.controls.moduleId.setValue(res?.Data?.TrainingModuleId)
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.trainingId = param.get('id');
      console.log('this.trainingId', this.trainingId);
      this.getModules();
    });

    this.moduleForm.controls.moduleId.setValue(this.trainingService?.contentCreationData?.ModuleObj?.Id)

  }

  getModules() {
    try{
    this.loaderOverlayService.openLoader();
    console.log(49, this.trainingService.contentCreationData.SkillObj);
    this.trainingService.getContentCreationData(this.trainingService.contentCreationData.SkillObj.Id, 'module').subscribe(res => {
      console.log(50, res);
      this.loaderOverlayService.removeLoader();
      this.moduleList = res;

      if(this.latestResponse){
        this.moduleList = this.moduleList.concat(this.latestResponse)
      }

      // this.moduleList = this.moduleList.map((item:any) =>{
      //   item.Name = item.Name + " - " + item.Duration + " mins";
      //   return item;
      // })
    })
  }catch(error){
    this.router.navigate(['content-creation/type']);
  }
  }

  onSubmit() {

    if (this.moduleForm.invalid) {
      return;
    }

    let trDoc:any = this.moduleList.find((x:any) => x.Id == this.moduleForm.value.moduleId)
    this.trainingService.contentCreationData.ModuleObj = trDoc;

    this.messageService.add({ severity: 'success', summary: `Module added successfully.` });
    setTimeout(() => {
      this.router.navigate(['/content-creation/topic']);
    }, 1000);
  }

  addRecord(data: any, compName: string) {
    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Add Module`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'Module', SkillId: this.trainingService.contentCreationData.SkillObj.Id }
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getModules();

    });
  }

  back(){
    this.router.navigate(['content-creation/skill']);
  }

  clear(event : any, comp : string){
    this.trainingService.clearLabelData(comp);
  }

  
  editRecord(event : any, component : any){

    let trDoc: any = this.moduleList.find((x: any) => x.Id == this.moduleForm.value.moduleId)
      this.trainingService.contentCreationData.ModuleObj = trDoc;

      this.trainingService.isComingFromEditBox = true;

    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Edit Module`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'editModule', selectedValue: this.trainingService.contentCreationData.ModuleObj,  SkillId: this.trainingService.contentCreationData.SkillObj.Id}
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getModules();

    });
  }

}
