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
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skillForm: FormGroup
  list: any =[];
  skillList: any = [];
  latestResponse: any = [];
  subscription: Subscription;
  trainingTypeId: string | null;
  ref: DynamicDialogRef = new DynamicDialogRef;

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
    this.skillForm = this.fb.group({
      skillId: [null, [Validators.required]]
    })

    this.subscription = this.trainingService.getMessage().subscribe(res =>{
      console.log(38,res)
      if(res?.Data?.SkillId){
        this.latestResponse = {
          Id: res.Data?.SkillId,
          Name: res.Data?.SkillName      
        }
      }
      this.skillForm.controls.skillId.setValue(res?.Data?.SkillId)
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.trainingTypeId = param.get('id');
      console.log('this.trainingTypeId', this.trainingTypeId);
      this.getContentCreationDomains();
    });

    this.skillForm.controls.skillId.setValue(this.trainingService?.contentCreationData?.SkillObj?.Id)

  }


  getContentCreationDomains() {
    try{
    this.loaderOverlayService.openLoader();
    this.trainingService.getContentCreationData(this.trainingService.contentCreationData.DomainObj.Id, 'skill').subscribe(res => {
      console.log(47, res);
      this.loaderOverlayService.removeLoader();
      this.skillList = res;

      if(this.latestResponse){
        this.skillList = this.skillList.concat(this.latestResponse)
      }
      // this.skillList = this.skillList.map((item:any) =>{
      //     item.Name = item.Name + " - " + item.Duration + " mins";
      //     return item;
      //   })
    });
  }catch(error){
    this.router.navigate(['content-creation/type']);
  }
  }

  onSubmit() {
    if(this.skillForm.invalid){
      return ;
    }

    let trDoc:any = this.skillList.find((x:any) => x.Id == this.skillForm.value.skillId)
      this.trainingService.contentCreationData.SkillObj = trDoc;

    this.messageService.add({ severity: 'success', summary: `Skill added successfully.` });
    setTimeout(() => {
      this.router.navigate(['/content-creation/module']);
    }, 500);
  }

  addRecord(data: any, compName: string) {
    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Add Skill`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'Skill', DomainId: this.trainingService.contentCreationData.DomainObj.Id, TrainingTypeId: this.trainingService.contentCreationData.TrainingTypeObj.Id }
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getContentCreationDomains();
    });
  }

  back(){
    this.router.navigate(['content-creation/domain']);
  }

  clear(event : any, comp : string){
    this.trainingService.clearLabelData(comp);
  }

  editRecord(event : any, component : any){

    let trDoc: any = this.skillList.find((x: any) => x.Id == this.skillForm.value.skillId)
      this.trainingService.contentCreationData.SkillObj = trDoc;

      this.trainingService.isComingFromEditBox = true;

    this.ref = this.dialogService.open(AddRecordComponent, {
      header: `Edit Skill`,
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { compType: 'editSkill', selectedValue: this.trainingService.contentCreationData.SkillObj, DomainId: this.trainingService.contentCreationData.DomainObj.Id}
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getContentCreationDomains();
    });
  }
}
