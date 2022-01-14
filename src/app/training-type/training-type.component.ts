import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { TrainingService } from 'src/app/services/training.service';
import { AddRecordComponent } from '../common/add-record/add-record.component';
import { LoaderOverlayService } from '../common/loader-overlay/loader-overlay.service';


interface TrainingTypeModel {
  TrainingTypeName: string;
  StatusId: number;
  TrainingTypeId: number;
};

@Component({
  selector: 'app-training-type',
  templateUrl: './training-type.component.html',
  styleUrls: ['./training-type.component.scss'],
})

export class TrainingTypeComponent implements OnInit {

  contentTrainingTypeForm: FormGroup;
  trainingTypeData: any;
  trainingTypeList: any = [];
  selectedData: any;
  trainingTypeId: any;
  projectList: any = [];
  subscription: Subscription | undefined;

  constructor(
    public ref: DynamicDialogRef,
    public trainingService: TrainingService,
    private fb: FormBuilder,
    public dialogService: DialogService,
    private router: Router,
    private messageService: MessageService,
    private loaderOverlayService: LoaderOverlayService
  ) {
    this.getTrainingType();
    this.getProjects();
    this.trainingTypeData = {
      TrainingName: '',
      TrainingTypeId: 0,
      StatusId: 0
    }
    this.contentTrainingTypeForm = this.fb.group({
      // TrainingName: ['', [Validators.required]],
      TrainingTypeId: [, [Validators.required]]
      // ProjectId: [, [Validators.required]],
    });

    //Setting the value that has been added in the form.
    this.subscription = this.trainingService.getMessage().subscribe(res =>{
      this.contentTrainingTypeForm.controls.TrainingTypeId.setValue(res?.Data?.TrainingTypeId)
    })
  }

  ngOnInit(): void {
    // this.contentTrainingTypeForm.controls.TrainingName.setValue(this.trainingService?.contentCreationData?.TrainingContentName);
    // this.contentTrainingTypeForm.controls.ProjectId.setValue(this.trainingService?.contentCreationData?.ProjectId);
    this.contentTrainingTypeForm.controls.TrainingTypeId.setValue(this.trainingService?.contentCreationData?.TrainingTypeObj?.Id);
  }


  getTrainingType() {
    this.loaderOverlayService.openLoader();
    this.trainingService.getTrainingType()
      .subscribe((response: any) => {
        this.loaderOverlayService.removeLoader();
        this.trainingTypeList = response;
        console.log(56, this.trainingTypeList)
      }
      )
  }

  getProjects() {
    this.trainingService.getProjects().subscribe((res: any) => {
      this.projectList = res;
      console.log(76, this.projectList);

      this.projectList = this.projectList.map((project : any) =>{
        project.Name = project.Id + " - " + project.Name
        return project;
      })
    })
  }

  get f() {
    return this.contentTrainingTypeForm.controls;
  }

  addRecord(data: any, compName: string) {
    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Add Training Type`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'TrainingType' }
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getTrainingType();

    });

  }

  async onSubmit() {
    if (this.contentTrainingTypeForm.invalid) {
      return 
    }

    try {
      this.trainingTypeData.TrainingContentName = this.contentTrainingTypeForm.value.TrainingName;
      this.trainingTypeData.TrainingTypeId = this.contentTrainingTypeForm.value.TrainingTypeId;
      console.log('req data', this.trainingTypeData);

      let trDoc: any = this.trainingTypeList.find((x: any) => x.Id == this.contentTrainingTypeForm.value.TrainingTypeId)
      this.trainingService.contentCreationData.TrainingTypeObj = trDoc;
      this.trainingService.contentCreationData.TrainingContentName = this.contentTrainingTypeForm.value.TrainingName;
      this.trainingService.contentCreationData.ProjectId = this.contentTrainingTypeForm.value.ProjectId;

      this.selectedData = this.trainingService.contentCreationData.TrainingTypeObj.Name;
      console.log(126, this.trainingService.contentCreationData)

      // this.contentTrainingTypeForm.controls.TrainingTypeId.setValue(this.trainingService.contentCreationData.TrainingTypeObj.Name);


      this.messageService.add({ severity: 'success', summary: `Training Type added successfully.` });

      setTimeout(() => {
        this.router.navigate(['/content-creation/domain']);
      }, 500);
    } catch (error) {
    }

  }

  clear(event : any, comp : string) {
    //For clearing label on back button.
    this.trainingService.clearLabelData(comp);
  }

  editRecord(event : any, component : any){

    let trDoc: any = this.trainingTypeList.find((x: any) => x.Id == this.contentTrainingTypeForm.value.TrainingTypeId)
      this.trainingService.contentCreationData.TrainingTypeObj = trDoc;

      this.trainingService.isComingFromEditBox = true;

    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Edit Training Type`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'editTrainingType', selectedValue: this.trainingService.contentCreationData.TrainingTypeObj}
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getTrainingType();

    });
  }
}
