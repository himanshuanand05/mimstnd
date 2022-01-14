import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LoaderOverlayService } from 'src/app/common/loader-overlay/loader-overlay.service';
import { TrainingService } from 'src/app/services/training.service';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '../../shared/app-constants'

@Component({
  selector: 'app-list-content-creation',
  templateUrl: './list-content-creation.component.html',
  styleUrls: ['./list-content-creation.component.scss']
})
export class ListContentCreationComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({
    trainingContentName: ['', [Validators.required]],
    trainingType: [null, [Validators.required]],
    domain: [null, [Validators.required]],
    skill: [null, [Validators.required]],
    module: [null, [Validators.required]],
    topic: [null, [Validators.required]],
    subTopic: [null, [Validators.required]],
    status: [null, [Validators.required]],
  });

  appConstant = AppConstants;
  contentList: any = [];
  activeStatusContentList: any = [];
  totalRecords: any;
  statusId: boolean = true;
  isActiveStatus: boolean = false;
  filterObject: object = {};
  Cons: any[] = [];
  trainingTypeList: any = [];
  domainList: any = [];
  skillList: any = [];
  moduleList: any = [];
  topicList: any = [];
  subTopicList: any = [];
  statusList: any = [];

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private loaderOverlayService: LoaderOverlayService,
    public confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getTrainingTypes();
    this.getDomains();
    this.getSkills();
    this.getModules();
    this.getTopics();
    this.getSubTopics();
    this.getStatusByType();
  }

  getTrainingTypes() {
    this.loaderOverlayService.openLoader();
    this.trainingService.getTrainingType()
      .subscribe((response: any) => {
        this.loaderOverlayService.removeLoader();
        this.trainingTypeList = response;
      }
      )
  }

  getDomains() {
    this.trainingService.getDomainList().subscribe((res) => {
      this.domainList = res
    })
  }

  getSkills() {
    this.trainingService.getSkillList().subscribe((res) => {
      this.skillList = res
    })
  }

  getModules() {
    this.trainingService.getModuleList().subscribe((res) => {
      this.moduleList = res
    })
  }

  getTopics() {
    this.trainingService.getTopicList().subscribe((res) => {
      this.topicList = res
    })
  }

  getSubTopics() {
    this.trainingService.getSubTopicList().subscribe((res) => {
      this.subTopicList = res
    })
  }

  getStatusByType() {
    let data = "trainingcontent";
    this.trainingService.getStatusByType(data).subscribe((res: any) => {
      this.statusList = res;
    })

  }

  getTrainingContentList(pageData: any) {

    this.loaderOverlayService.openLoader();
    this.trainingService.getTrainingContentList(pageData)
      .subscribe((res: any) => {
        this.loaderOverlayService.removeLoader();
        this.contentList = res.records;
        this.totalRecords = res.totalRecords;
        console.log(115, res)
        //Active statuses records to be sent from backend. Needs to change this.
          this.contentList = this.contentList.filter((item: any) => {
            if (item.TrainingStatusName == 'Active') {
              this.contentList = item;
              this.isActiveStatus = true;
              return item;
            }
          })

          // this.totalRecords = this.contentList.length   //Total Records needs to be sent from backend
          // console.log(118, this.contentList);

      });

  }

  rows = 10;
  // totalRecords = 0;
  loadContentCreationData(event: LazyLoadEvent) {
    let eventRows = event.rows || 0;
    let first = event.first ? event.first / eventRows : 0;
    let currentPage = (first + 1) || 1;
    let pageData = {
      PageSize: eventRows,
      PageNumber: currentPage,
      Conditions: this.Cons
    };

    this.getTrainingContentList(pageData);
  }


  changeStatus(TrainingContentId: number, content : any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to change the status of this content?',
      accept: () => {
        if (this.statusId == false) {
          console.log(57, "called");
          this.statusId = true;

          let objects = {
            TrainingContentId: TrainingContentId,
            StatusId: 11
          }
          this.trainingService.changeStatus(objects).subscribe((res: any) => {
            console.log(58, res)
          })
        } else {
          console.log(66, "called");
          this.statusId = false;

          let object = {
            TrainingContentId: TrainingContentId,
            StatusId: 12
          }
          this.trainingService.changeStatus(object).subscribe((res: any) => {
            console.log(62, res)
          })
        }
      },
      reject: () => {
        content.StatusId = 11;
      }
    });
  }

  onSubmit() {
    console.log(104, this.searchForm.value);

    let trainingContentName = this.searchForm.value.trainingContentName;
    let trainingType = this.searchForm.value.trainingType;
    let domain = this.searchForm.value.domain;
    let skill = this.searchForm.value.skill;
    let module = this.searchForm.value.module;
    let topic = this.searchForm.value.topic;
    let subTopic = this.searchForm.value.subTopic;
    let status = this.searchForm.value.status;

    if (trainingContentName) {
      this.Cons.push({
        "fieldName": "trainingName",
        "fieldValue": trainingContentName,
        "filterOperator": "like"
      });

    } if (trainingType) {
      this.Cons.push({
        "fieldName": "trainingType",
        "fieldValue": trainingType?.Id,
        "filterOperator": "equal"
      });

    } if (domain) {
      this.Cons.push({
        "fieldName": "domain",
        "fieldValue": domain?.Id,
        "filterOperator": "equal"
      });

    } if (skill) {
      this.Cons.push({
        "fieldName": "skill",
        "fieldValue": skill?.Id,
        "filterOperator": "equal"
      });

    } if (module) {
      this.Cons.push({
        "fieldName": "module",
        "fieldValue": module?.Id,
        "filterOperator": "equal"
      });

    } if (topic) {
      this.Cons.push({
        "fieldName": "topic",
        "fieldValue": topic?.Id,
        "filterOperator": "equal"
      });

    } if (subTopic) {
      this.Cons.push({
        "fieldName": "subTopic",
        "fieldValue": subTopic?.Id,
        "filterOperator": "equal"
      });
    } if (status) {
      this.Cons.push({
        "fieldName": "status",
        "fieldValue": status?.Id,
        "filterOperator": "equal"
      });
    }

    this.filterObject = {
      PageSize: this.rows,
      PageNumber: 1,
      Conditions: this.Cons
    }

    console.log(259, this.filterObject)
    this.loaderOverlayService.openLoader();
    this.trainingService.filterData(this.filterObject).subscribe((res: any) => {
      this.loaderOverlayService.removeLoader();
      console.log(262, res);
      this.contentList = res.records;
      this.totalRecords = res.totalRecords;
      // this.Cons.length = 0

    })
  }

  resetSearchForm() {
    this.searchForm.reset();
  }

  async clear(event: any, type: string) {
    this.Cons.length = 0
    switch(type){
      case "type" : {
        if(!this.searchForm.value?.trainingType){
          return;
        }
        console.log(277,this.searchForm.value.trainingType);
        let ans = await this.trainingService.getDomain(this.searchForm.value?.trainingType?.Id).toPromise();
        console.log(279, ans)

        this.domainList = ans;

        break ;
      }

      case "domain" : {
        if(!this.searchForm.value?.domain){
          return;
        }
        let ans = await this.trainingService.getContentCreationData(this.searchForm.value?.domain?.Id, 'skill').toPromise();
        console.log(288, ans,this.searchForm.value?.domain?.Id )

        this.skillList = ans;
        break ;
      }

      case "skill" : {
        if(!this.searchForm.value?.skill){
          this.moduleList = [];
          this.topicList = [];
          this.subTopicList = [];
          return;
        }
        // let ans = await this.trainingService.getContentCreationData(this.searchForm.value?.skill?.Id, 'module').toPromise();
        // console.log(297, ans)

        // this.moduleList = ans;
        console.log(309, this.searchForm.value.skill.Id.toString())
        let obj = {
          "SkillIds": this.searchForm.value.skill.Id.toString(),
          "ModuleIds": "",
          "TopicIds": ""
        }
        let ans : any= await this.trainingService.getAllLowerLeaves(obj).toPromise();
        console.log(311, ans)

        this.moduleList = ans.Modules;
        this.topicList = ans.Topics;
        this.subTopicList = ans.SubTopics;

        break ;
      }

      case "module" : {
        if(!this.searchForm.value?.module){ //If module is cut , then topic & subTopic will be get by skill
          let obj = {
            "SkillIds": this.searchForm.value.skill.Id.toString(),
            "ModuleIds": "",
            "TopicIds": ""
          }
          let ans : any= await this.trainingService.getAllLowerLeaves(obj).toPromise();
  
          this.topicList = ans.Topics;
          this.subTopicList = ans.SubTopics;
          return;
        }
        //If SKill & Module both are selected
        let obj = {
          "SkillIds": this.searchForm.value.skill.Id.toString(),
          "ModuleIds": this.searchForm.value.module.Id.toString(),
          "TopicIds": ""
        }
        let ans : any= await this.trainingService.getAllLowerLeaves(obj).toPromise();

        this.topicList = ans.Topics;
        this.subTopicList = ans.SubTopics;

        break ; 
      }

      case "topic" : {
        if(!this.searchForm.value?.topic){ //If topic is cut, then subTopic will be get by skill & Module.
          let obj = {
            "SkillIds": this.searchForm.value.skill.Id.toString(),
            "ModuleIds": this.searchForm.value.module.Id.toString(),
            "TopicIds": ""
          }
          let ans : any= await this.trainingService.getAllLowerLeaves(obj).toPromise();
          this.subTopicList = ans.SubTopics;

          return;
        }
        let obj = {
          "SkillIds": this.searchForm.value.skill.Id.toString(),
          "ModuleIds": this.searchForm.value.module.Id.toString(),
          "TopicIds": this.searchForm.value.topic.Id.toString(),
        }
        let ans : any= await this.trainingService.getAllLowerLeaves(obj).toPromise();
        this.subTopicList = ans.SubTopics;

        break ;
      }

      case "subTopic" : {
        break ;
      }
    }
  }
 
  // getSpecificStatus(event: any) {
  //   console.log(242, event.value.Id);
  //   this.trainingService.getSpecificStatus(event.value.Id).subscribe((res: any) => {
  //     console.log(res)
  //     this.contentList = res.records;
  //     this.totalRecords = res.totalRecords;
  //   });
  // }


}
