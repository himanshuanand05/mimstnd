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
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  trainingTypeId: string | null;
  domainForm: FormGroup;
  domainList: any = [];
  latestResponse: any = [];
  subscription: Subscription
  ref: DynamicDialogRef = new DynamicDialogRef;
  addDomainData = {};
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    public trainingService: TrainingService,
    private loaderOverlayService: LoaderOverlayService
  ) {
    this.trainingTypeId = '';
    this.domainForm = this.fb.group({
      domainId: [null, [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.trainingTypeId = param.get('id');
      console.log('this.trainingTypeId', this.trainingTypeId);
      this.getDomains();
    });
    this.subscription = this.trainingService.getMessage().subscribe(res => {
      if(res?.Data?.DomainId){
        this.latestResponse = {
          Id: res.Data?.DomainId,
          Name: res.Data?.DomainTypeName      
        }
      }
        this.domainForm.controls.domainId.setValue(res?.Data?.DomainId)
    })
    this.domainForm.controls.domainId.setValue(this.trainingService?.contentCreationData?.DomainObj?.Id)
  }

  onSubmit() {
    if (this.domainForm.invalid) {
      return
    }

    let trDoc: any = this.domainList.find((x: any) => x.Id == this.domainForm.value.domainId)
    this.trainingService.contentCreationData.DomainObj = trDoc;

    this.messageService.add({ severity: 'success', summary: `Domain added successfully.` });
    setTimeout(() => {
      this.router.navigate(['content-creation/skill']);
    }, 1000);
  }

  addRecord(data: any, compName: string) {
    console.log(67, this.trainingService.contentCreationData)
    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Add Domain`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'Domain', TrainingTypeId: this.trainingService.contentCreationData.TrainingTypeObj.Id }
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getDomains();
    });
  }

  getDomains() {
    try {
      console.log(60, this.trainingService.contentCreationData);
      this.loaderOverlayService.openLoader();
      this.trainingService.getDomain(this.trainingService.contentCreationData.TrainingTypeObj.Id)
        .subscribe((response: any) => {
          this.loaderOverlayService.removeLoader();
          this.domainList = response;
          
          if(this.latestResponse){
            this.domainList = this.domainList.concat(this.latestResponse)
          }
          console.log(98, response)
        })
    } catch (error) {
      this.router.navigate(['content-creation/type']);
    }
  }

  back() {
    this.trainingService.makeTrainingTypeSaveButtonValid = true;
    this.router.navigate(['content-creation/type']);
  }

  clear(event: any, comp: string) {
    this.trainingService.clearLabelData(comp);
  }

  editRecord(event: any, component: any) {

    let trDoc: any = this.domainList.find((x: any) => x.Id == this.domainForm.value.domainId)
    this.trainingService.contentCreationData.DomainObj = trDoc;

    this.trainingService.isComingFromEditBox = true;

    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Edit Training Type`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'editDomain', selectedValue: this.trainingService.contentCreationData.DomainObj, TrainingTypeId: this.trainingService.contentCreationData.TrainingTypeObj.Id }
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getDomains();

    });
  }

}
