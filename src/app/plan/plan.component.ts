import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from '../services/training.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
// import { MinToHoursPipe } from '../pipes/min-to-hours.pipe'


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})

export class PlanComponent implements OnInit {
  addPlanForm: FormGroup = this.fb.group({
    trainingPlanName: ['', [Validators.required]],
    projectName: ['', [Validators.required]],
    // trainingContentName: ['', [Validators.required]],
    trainingType: ['', [Validators.required]],
    domain: ['', [Validators.required]],
    skill: ['', [Validators.required]],
    module: ['', [Validators.required]],
    topic: ['', [Validators.required]],
    subTopic: ['', [Validators.required]],
    // duration: ['', [Validators.required]]
  })

  projectList: any = [];
  trainingContentName: any = [];
  trainingTypeList: any = [];
  domainList: any[] = [];
  skillList: any[] = [];
  moduleList: any[] = [];
  topicList: any[] = [];
  subTopicList: any[] = [];

  a: any = [];
  TotalDuration = 0;
  MinsToHours:any;

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private confirmationService: ConfirmationService,
    private router : Router,
    private messageService : MessageService
  ) {
    this.getProjects();
    this.getTrainingTypes();
  }

  ngOnInit(): void {
  }

  getProjects() {
    this.trainingService.getProjects().subscribe((res: any) => {
      this.projectList = res;
    })
  }

  getTrainingTypes() {
    this.trainingService.getTrainingType().subscribe((res: any) => {
      this.trainingTypeList = res;
    })
  }

  getDomains(Id: any) {
    if (Id) {
      this.trainingService.getDomain(Id).subscribe((res: any) => {
        console.log(87, res)
        this.domainList = res;

        // let doaminIds = res.map((item:any)=>{
        //   return item.Id;
        // })
        // console.log(194, doaminIds)


        //   this.addPlanForm.get('domain')?.setValue(doaminIds);

        //  console.log(98, this.addPlanForm.value)

      })
    }
    else {
      this.domainList = [];
    }
  }

  async getSkill(Id: any, type: any) {
    console.log(110, Id, type);

    // let formconttrolIds = Id;


    this.skillList = []
    // formconttrolIds.forEach(async (item: any) => {
    let response = await this.trainingService.getContentCreationData(Id, type).toPromise();
    this.skillList = this.skillList.concat(response);
    console.log(119, this.skillList)
    // })
  }

  async getModule_Topic_SubTopic(Id: any) {
    console.log(124, Id);

    //For Multiple Id's
    // let ids = Id;

    this.moduleList = [];
    this.topicList = [];
    this.subTopicList = [];
    let obj = {
      "SkillIds": Id.toString(),
      "ModuleIds": "",
      "TopicIds": ""
    }

    let res: any = await this.trainingService.getAllLowerLeaves(obj).toPromise();
    console.log(139, res);

    this.moduleList = [];
    this.moduleList = this.moduleList.concat(res.Modules);

    this.topicList = [];
    this.topicList = this.topicList.concat(res.Topics);

    this.subTopicList = [];
    this.subTopicList = this.subTopicList.concat(res.SubTopics);

    //Module Binding
    let moduleIds = res.Modules.map((item: any) => {
      return item.Id;
    })
    this.addPlanForm.get('module')?.setValue(moduleIds);

    //Binding Topics
    let topicIds = res.Topics.map((item: any) => {
      return item.Id;
    })
    this.addPlanForm.get('topic')?.setValue(topicIds);

    //Binding SubTopics
    let subTopicIds = res.SubTopics.map((item: any) => {
      return item.Id;
    })
    this.addPlanForm.get('subTopic')?.setValue(subTopicIds);

    //Binding Duration when skill is selected
    // res.SubTopics.map((key: any) => {
    //   this.TotalDuration = this.TotalDuration + key.Duration
    // })
    // console.log(152, this.TotalDuration)

    this.calculateDuration(res.SubTopics);


  }

  calculateDuration(subTopic:Array<any>){
    this.TotalDuration = 0;
    subTopic.forEach((item:any)=>{
      this.TotalDuration = this.TotalDuration + item.Duration;
    })

    // this.MinsToHours = this.pipe.transform(this.TotalDuration);

  }

  async getTopic_SubTopic(Id: any) {
    console.log(167, Id)
    console.log(168, this.addPlanForm.value.skill)
    console.log(169, this.addPlanForm.value.topic)
    if (!Id.length) {
      this.topicList = [];
      this.subTopicList = [];
    } else {
      let skillIds = this.addPlanForm.value.skill;
      let moduleIds = Id;

      let obj = {
        "SkillIds": skillIds.toString(),
        "ModuleIds": moduleIds.toString(),
        "TopicIds": ""
      }

      this.topicList = [];
      this.subTopicList = [];
      // moduleIds.forEach(async (item: any) => {

        let res: any = await this.trainingService.getAllLowerLeaves(obj).toPromise();
        console.log(184, res);

        this.topicList = res.Topics;
        this.subTopicList = res.SubTopics;

        //Binding Topics
        let topicIds = res.Topics.map((item: any) => {
          return item.Id;
        })
        this.addPlanForm.get('topic')?.setValue(topicIds);

        //Binding SubTopics
        let subTopicIds = res.SubTopics.map((item: any) => {
          return item.Id;
        })
        this.addPlanForm.get('subTopic')?.setValue(subTopicIds);

        this.calculateDuration(res.SubTopics);

        //Binding Duration when module is selected
        // this.TotalDuration = 0;
        // res.SubTopics.map((key: any) => {
        //   this.TotalDuration = this.TotalDuration + key.Duration
        // })
        // console.log(197, this.TotalDuration)

      // })
    }
  }

  async getSubTopic(Id: any) {
    console.log(208, Id);

    console.log(210, this.addPlanForm.value.topic)
    if (!Id.length) {
      this.subTopicList = [];
    } else {
      let skillIds = this.addPlanForm.value.skill;
      let moduleIds = this.addPlanForm.value.module;
      let topicIds = Id;

      let obj = {
        "SkillIds": skillIds.toString(),
        "ModuleIds": moduleIds.toString(),
        "TopicIds": topicIds.toString()
      }

      this.subTopicList = [];
      // topicIds.forEach(async (item: any) => {

        let res: any = await this.trainingService.getAllLowerLeaves(obj).toPromise();
        console.log(236, res);
        this.subTopicList = res.SubTopics;

        //Binding SubTopics
        let subTopicIds = res.SubTopics.map((item: any) => {
          return item.Id;
        })
        this.addPlanForm.get('subTopic')?.setValue(subTopicIds);

        this.calculateDuration(res.SubTopics);

      // })
    }
  }


  submit() {
    console.log(56, this.addPlanForm.value);

    let planObject = {
      trainingPlanName: this.addPlanForm.value.trainingPlanName,
      ProjectId: this.addPlanForm.value.projectName,
      TrainingContentIdList: this.addPlanForm.value.subTopic,
      SubTopicIdList: this.addPlanForm.value.subTopic,
      trainingType: this.addPlanForm.value.trainingType,
      domain: this.addPlanForm.value.domain,
      skill: this.addPlanForm.value.skill,
      module: this.addPlanForm.value.module,
      topic: this.addPlanForm.value.topic,
      subTopic: this.addPlanForm.value.subTopic
    }
    console.log(93, planObject)

    this.trainingService.addTrainingPlan(planObject).subscribe((res: any) => {
      console.log(96, res);
      this.messageService.add({ severity: 'success', summary: `Training Plan added successfully.` });
      this.router.navigate(['/plan/list'])
    })
  }

  async populateLeaves(dropdown: string) {
    // try {
    //   switch (dropdown) {
    //     case 'contentName': {
    //       let response: any = await this.trainingService.getLeaves('contentName').toPromise();
    //       console.log(response);
    //       this.trainingTypeList = response;
    //       this.domainList = response;
    //       this.skillList = response;
    //       this.moduleList = response;
    //       this.topicList = response;
    //       this.subTopicList = response;

    //       break;
    //     }

    //     case 'trainingType': {
    //       let response: any = await this.trainingService.getLeaves('trainingType').toPromise();
    //       console.log(response);
    //       this.domainList = response;
    //       this.skillList = response;
    //       this.moduleList = response;
    //       this.topicList = response;
    //       this.subTopicList = response;

    //       break;

    //     }

    //     case 'domain': {
    //       let response: any = await this.trainingService.getLeaves('domain').toPromise();
    //       console.log(response);
    //       this.skillList = response;
    //       this.moduleList = response;
    //       this.topicList = response;
    //       this.subTopicList = response;

    //       break;

    //     }

    //     case 'skill': {
    //       let response: any = await this.trainingService.getLeaves('skill').toPromise();
    //       console.log(response);
    //       this.moduleList = response;
    //       this.topicList = response;
    //       this.subTopicList = response;

    //       break;

    //     }

    //     case 'module': {
    //       let response: any = await this.trainingService.getLeaves('module').toPromise();
    //       console.log(response);
    //       this.topicList = response;
    //       this.subTopicList = response;

    //       break;

    //     }

    //     case 'topic': {
    //       let response: any = await this.trainingService.getLeaves('topic').toPromise();
    //       console.log(response);
    //       this.subTopicList = response;

    //       break;

    //     }

    //     case 'subTopic': {
    //       let response: any = await this.trainingService.getLeaves('subTopic').toPromise();
    //       console.log(response);

    //       break;

    //     }

    //     default : console.log("Default case")

    //     break;
    //   }
    // }catch(error){
    //   return error;
    // }

  }
}
