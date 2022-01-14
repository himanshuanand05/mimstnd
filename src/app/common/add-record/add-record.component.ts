import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TrainingService } from 'src/app/services/training.service';
import { MessageService } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoaderOverlayService } from '../loader-overlay/loader-overlay.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

  addRecordForm: FormGroup;
  trainingTypeData: any = {};
  compType: string = '';
  selectedValue: any = {};
  dialogData: any = {};
  activeComponent: any;
  show: boolean = false;
  updatedList: any =[];

  constructor(
    public trainingService: TrainingService,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private loaderOverlayService: LoaderOverlayService
  ) {
    this.compType = config?.data?.compType;
    this.selectedValue = config?.data?.selectedValue;
    this.dialogData = config?.data;
    this.addRecordForm = this.fb.group({
      Name: ['', [Validators.required]],
      Duration: ['', [Validators.required, Validators.max(60)]]

    });
    console.log('this.dialogData', this.dialogData);

    if (this.compType == 'editTrainingType' || this.compType == 'editDomain') {
      this.addRecordForm.get('Name')?.setValue(this.selectedValue.Name);
    } else if (this.compType == 'editSkill' || this.compType == 'editModule' || this.compType == 'editTopic' || this.compType == 'editSubTopic') {
      let Name = this.selectedValue.Name;
      let str = Name.split("-");

      this.addRecordForm.get('Name')?.setValue(str[0]);
      this.addRecordForm.get('Duration')?.setValue(this.selectedValue.Duration);
    }
  }

  ngOnInit(): void {
    this.activeComponent = this.dialogData.compType;
    console.log(41, this.activeComponent)
    if ((this.activeComponent == "subTopic")  || (this.activeComponent == "editSubTopic")) {
      this.show = true;
      // (this.activeComponent == "Skill") || (this.activeComponent == "Module") || (this.activeComponent == "Topic") || || (this.activeComponent == "editSkill") || (this.activeComponent == "editModule") || (this.activeComponent == "editTopic")
    }
    console.log(45, this.show)
  }

  get f() {
    return this.addRecordForm.controls;
  }
  async onSubmit() {
    if (this.compType == "TrainingType" || this.compType == "Domain" || this.compType == "Skill" || this.compType == "Module" || this.compType == "Topic" || this.compType == "editTrainingType" || this.compType == "editDomain" || this.compType == "editSkill" || this.compType == "editModule" || this.compType == "editTopic"){
      this.addRecordForm.controls.Duration.setValue(0);
    }

    if (this.addRecordForm.invalid) {
      return;
    }

    console.log('compType', this.compType)
    try {
      switch (this.compType) {
        case 'TrainingType': {
          this.loaderOverlayService.openLoader();
          this.trainingTypeData.TrainingTypeName = this.addRecordForm.value.Name;
          console.log('req data', this.trainingTypeData);
          let res = await this.trainingService.addTrainingType(this.trainingTypeData).toPromise();
          this.loaderOverlayService.removeLoader();

          console.log('50res', res);
          this.messageService.add({ severity: 'success', summary: `Training Content added successfully.` });

          //Sending Training Type Added to the Training Type Component.
          this.trainingService.sendMessage(res);

          break;
        }

        case 'Domain': {
          this.loaderOverlayService.openLoader();
          let domainReq = {
            TrainingTypeId: 1,
            DomainTypeName: '',
          }
          domainReq.TrainingTypeId = this.dialogData.TrainingTypeId;
          domainReq.DomainTypeName = this.addRecordForm.value.Name;
          console.log('req data', domainReq);
          let res: any = await this.trainingService.addDomain(domainReq).toPromise();
          this.loaderOverlayService.removeLoader();

          // going to be remove
          this.trainingService.contentCreationData.DomainId = res.Data.DomainId;
          console.log('res', res);
          this.messageService.add({ severity: 'success', summary: `Domain added successfully.` });

          //Sending Domain Added to the Domain Component.
          this.trainingService.sendMessage(res);

          break;
        }

        case 'Skill': {
          this.loaderOverlayService.openLoader();
          let skillReq = {
            // TrainingContentName : 'HR Training',
            TrainingTypeId: 1,
            DomainId: 0,
            SkillName: '',
            Duration: 0
          }
          skillReq.TrainingTypeId = this.dialogData.TrainingTypeId;
          skillReq.DomainId = this.dialogData.DomainId;

          skillReq.SkillName = this.addRecordForm.value.Name;
          skillReq.Duration = this.addRecordForm.value.Duration;
          console.log('req data', skillReq);
          let res: any = await this.trainingService.addSkill(skillReq).toPromise();
          this.loaderOverlayService.removeLoader();

          // going to be remove
          this.trainingService.contentCreationData.DomainId = res.Data.DomainId;
          console.log('res', res);
          this.messageService.add({ severity: 'success', summary: `Skill added successfully.` });

          //Sending Skill Added to the Skill Component.
          this.trainingService.sendMessage(res);
          break;
        }

        case 'Module': {
          this.loaderOverlayService.openLoader();
          let requestData = {
            TrainingModuleName: this.addRecordForm.value.Name,
            SkillId: this.dialogData.SkillId,
            Duration: this.addRecordForm.value.Duration

          }
          let ans = await this.trainingService.addModule(requestData).toPromise();
          this.loaderOverlayService.removeLoader();
          console.log('54res', ans);
          this.messageService.add({ severity: 'success', summary: `Module added successfully.` });

          //Sending Module Added to the Module Component.
          this.trainingService.sendMessage(ans);

          // this.trainingService.getContentCreationData(this.trainingService.contentCreationData.DomainObj.Id, 'skill').subscribe(res =>{
          //   console.log(151,res);
          //   this.updatedList = res;

          //   this.updatedList = this.updatedList.map((item:any) =>{
          //     item.Name = item.Name + " - " + item.Duration + " mins";
          //     return item;
          //   })

          //   let trDoc:any = this.updatedList.find((x:any) => x.Id == requestData.SkillId)
          //   this.trainingService.contentCreationData.SkillObj = trDoc;
          
          // })

          break;
        }

        case 'Topic': {
          this.loaderOverlayService.openLoader();
          let requestData = {
            ModuleTopicName: this.addRecordForm.value.Name,
            TrainingContentName: 'Data structures in Python',
            ModuleId: this.dialogData.ModuleId,
            StatusId: 1,
            TrainingTypeId: 1,
            Duration: this.addRecordForm.value.Duration
          }
          let ans = await this.trainingService.addTopic(requestData).toPromise();
          this.loaderOverlayService.removeLoader();
          console.log('54res', ans);
          this.messageService.add({ severity: 'success', summary: `Topic added successfully.` });

          //Sending Topic Added to the Topic Component.
          this.trainingService.sendMessage(ans);


          //Updating Skill when adding Topic.
          // this.trainingService.getContentCreationData(this.trainingService.contentCreationData.DomainObj.Id, 'skill').subscribe(res =>{
          //   console.log(151,res);
          //   this.updatedList = res;

          //   this.updatedList = this.updatedList.map((item:any) =>{
          //     item.Name = item.Name + " - " + item.Duration + " mins";
          //     return item;
          //   })

          //   let trDoc:any = this.updatedList.find((x:any) => x.Id == this.trainingService.contentCreationData.SkillObj.Id)
          //   this.trainingService.contentCreationData.SkillObj = trDoc;
          
          // })

          //Updating Module when adding Topic
          // this.trainingService.getContentCreationData(this.trainingService.contentCreationData.SkillObj.Id, 'module').subscribe(res =>{
          //   console.log(151,res);
          //   this.updatedList = res;

          //   this.updatedList = this.updatedList.map((item:any) =>{
          //     item.Name = item.Name + " - " + item.Duration + " mins";
          //     return item;
          //   })

          //   let trDoc:any = this.updatedList.find((x:any) => x.Id == requestData.ModuleId)
          //   this.trainingService.contentCreationData.ModuleObj = trDoc;
          
          // })

          break;
        }

        case 'subTopic': {
          this.loaderOverlayService.openLoader();
          let requestData = {
            ModuleSubTopicName: this.addRecordForm.value.Name,
            moduleTopicId: this.dialogData.TopicId,
            StatusId: 1,
            Duration: this.addRecordForm.value.Duration

          }
          this.trainingService.contentDuration = this.addRecordForm.value.Duration;
          let ans = await this.trainingService.addSubTopic(requestData).toPromise();
          this.loaderOverlayService.removeLoader();
          console.log('54res', ans);
          this.messageService.add({ severity: 'success', summary: `Sub-Topic added successfully.` });

          //Sending Sub-Topic Added to the Sub-topic Component.
          this.trainingService.sendMessage(ans);


               //Updating Skill when adding  Sub-topic.
              //  this.trainingService.getContentCreationData(this.trainingService.contentCreationData.DomainObj.Id, 'skill').subscribe(res =>{
              //   console.log(151,res);
              //   this.updatedList = res;
    
              //   this.updatedList = this.updatedList.map((item:any) =>{
              //     item.Name = item.Name + " - " + item.Duration + " mins";
              //     return item;
              //   })
    
              //   let trDoc:any = this.updatedList.find((x:any) => x.Id == this.trainingService.contentCreationData.SkillObj.Id)
              //   this.trainingService.contentCreationData.SkillObj = trDoc;
              
              // })
    
              //Updating Module when adding  Sub-topic
              // this.trainingService.getContentCreationData(this.trainingService.contentCreationData.SkillObj.Id, 'module').subscribe(res =>{
              //   console.log(151,res);
              //   this.updatedList = res;
    
              //   this.updatedList = this.updatedList.map((item:any) =>{
              //     item.Name = item.Name + " - " + item.Duration + " mins";
              //     return item;
              //   })
    
              //   let trDoc:any = this.updatedList.find((x:any) => x.Id == this.trainingService.contentCreationData.ModuleObj.Id)
              //   this.trainingService.contentCreationData.ModuleObj = trDoc;
              
              // })
    


          //Updating Topic when adding Sub-topic
          // this.trainingService.getContentCreationData(this.trainingService.contentCreationData.ModuleObj.Id, 'topic').subscribe(res =>{
          //   console.log(151,res);
          //   this.updatedList = res;

          //   this.updatedList = this.updatedList.map((item:any) =>{
          //     item.Name = item.Name + " - " + item.Duration + " mins";
          //     return item;
          //   })

          //   let trDoc:any = this.updatedList.find((x:any) => x.Id == requestData.moduleTopicId)
          //   this.trainingService.contentCreationData.TopicObj = trDoc;
          
          // })

          break;
        }

        case 'editTrainingType': {
          this.loaderOverlayService.openLoader();
          let Name = this.addRecordForm.value.Name;
          
          let editTrainingTypeObj = {
            TrainingTypeId: this.selectedValue.Id,
            TrainingTypeName: Name
          }

          let res = await this.trainingService.editTrainingType(editTrainingTypeObj).toPromise();
          this.loaderOverlayService.removeLoader();
          this.messageService.add({ severity: 'success', summary: `Training Type Updated successfully.` });

          console.log(200, res)
          break;
        }

        case 'editDomain': {
          this.loaderOverlayService.openLoader();
          let Name = this.addRecordForm.value.Name;
          let editDomainObj = {
            DomainId: this.selectedValue.Id,
            DomainTypeName: Name,
            TrainingTypeId: this.dialogData.TrainingTypeId
          }

          let res = await this.trainingService.editDomain(editDomainObj).toPromise();
          this.loaderOverlayService.removeLoader();
          this.messageService.add({ severity: 'success', summary: `Domain Updated successfully.` });

          break;
        }

        case 'editSkill': {
          this.loaderOverlayService.openLoader();
          console.log(211, this.addRecordForm.value);
          let Name = this.addRecordForm.value.Name;
          // let Duration = this.addRecordForm.value.Duration;
          let editSkillObj = {
            SkillId: this.selectedValue.Id,
            SkillName: Name,
            // Duration: Duration,
            DomainId: this.dialogData.DomainId
          }
          let res = await this.trainingService.editSkill(editSkillObj).toPromise();
          this.loaderOverlayService.removeLoader();
          this.messageService.add({ severity: 'success', summary: `Skill Updated successfully.` });

          break;
        }

        case 'editModule': {
          this.loaderOverlayService.openLoader();
          console.log(233, this.addRecordForm.value.Name);
          let Name = this.addRecordForm.value.Name;
          // let Duration = this.addRecordForm.value.Duration;
          let editModuleObj = {
            TrainingModuleId: this.selectedValue.Id,
            TrainingModuleName: Name,
            // Duration: Duration,
            SkillId: this.dialogData.SkillId
          }
          let res = await this.trainingService.editModule(editModuleObj).toPromise();
          this.loaderOverlayService.removeLoader();
          this.messageService.add({ severity: 'success', summary: `Module Updated successfully.` });

          break;
        }

        case 'editTopic': {
          this.loaderOverlayService.openLoader();
          console.log(253, this.addRecordForm.value.Name);
          let Name = this.addRecordForm.value.Name;
          // let Duration = this.addRecordForm.value.Duration;
          let editTopicObj = {
            ModuleTopicId: this.selectedValue.Id,
            ModuleTopicName: Name,
            // Duration: Duration,
            ModuleId: this.dialogData.ModuleId
          }
          let res = await this.trainingService.editTopic(editTopicObj).toPromise();
          this.loaderOverlayService.removeLoader();
          this.messageService.add({ severity: 'success', summary: `Training Type Updated successfully.` });

          break;
        }


        case 'editSubTopic': {
          this.loaderOverlayService.openLoader();
          console.log(272, this.addRecordForm.value.Name);
          let Name = this.addRecordForm.value.Name;
          let Duration = this.addRecordForm.value.Duration;
          let editSubTopicObj = {
            ModuleSubTopicId: this.selectedValue.Id,
            ModuleSubTopicName: Name,
            Duration: Duration,
            ModuleTopicId: this.dialogData.ModuleTopicId
          }
          this.trainingService.contentDuration = Duration;
          console.log(398, editSubTopicObj)
          let res = await this.trainingService.editSubTopic(editSubTopicObj).toPromise();
          this.loaderOverlayService.removeLoader();
          this.messageService.add({ severity: 'success', summary: `Training Type Updated successfully.` });

          break;
        }

        default:
          console.log('invalid component type');
          break;
      }
      this.ref.close();
    } catch (error) {
      this.loaderOverlayService.removeLoader();
      this.ref.close();
      console.log(error);
    }

  }

}
