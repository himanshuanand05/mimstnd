import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-content-creation',
  templateUrl: './content-creation.component.html',
  styleUrls: ['./content-creation.component.scss'],
  providers: [ MessageService ]
})
export class ContentCreationComponent implements OnInit {

  items: MenuItem[] = [];
  activeIndex = 1;
  trainingTypeId: string | null = null;
  stepsLable = {
    TrainingType:'Training Type',
    Domain: 'Domain/Functional',
    Skills: 'Skills',
    Module: 'Module',
    Topic: 'Topic',
    SubTopic: 'Sub Topic',
    Review: 'Preview'
  };
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    public trainingService: TrainingService,
    private router: Router
  ) {  }

  init() {
    this.items = [{
      label: this.stepsLable.TrainingType,
      routerLink: 'type'
    },
    {
      label: this.stepsLable.Domain,
      routerLink: 'domain/'
    },
    {
      label: this.stepsLable.Skills,
      routerLink: 'skill/'
    },
    {
      label: this.stepsLable.Module,
      routerLink: 'module/'
    },
    {
      label: this.stepsLable.Topic,
      routerLink: 'topic/'
    },
    {
      label: this.stepsLable.SubTopic,
      routerLink: 'sub-topic/'
    },
    {
      label:  this.stepsLable.Review,
      routerLink: 'review/'
    }
    ];
  }

  routeName: string[] = [];
  ngOnInit(): void {

    this.init();

    // this.route.url.subscribe(() => {
    //   this.updateStepsLable();
    // });

    // this.route.paramMap.subscribe(param => {
    //   this.trainingTypeId = this.route?.firstChild?.snapshot.params['id'];
    //   this.trainingTypeId = '4';
    //   console.log('Content',this.trainingTypeId);
    // });
  }

  updateStepsLable() {
    try {
      let lastRoute: any = this.router.url.split('/');
        lastRoute = lastRoute[lastRoute.length-1];
        switch (lastRoute) {
          case 'domain':
            if ( this.trainingService.contentCreationData?.TrainingTypeObj?.Name) {
              this.items[0].label = this.getUpdatedLabel(this.stepsLable.TrainingType , this.trainingService.contentCreationData?.TrainingTypeObj?.Name);
            }else{
              this.items[0].label = this.stepsLable.TrainingType;
            }
            break;
          case 'skill':
            if ( this.trainingService.contentCreationData?.DomainObj?.Name) {
              this.items[1].label = this.getUpdatedLabel(this.stepsLable.Domain , this.trainingService.contentCreationData?.DomainObj?.Name);
            }else{
              this.items[1].label = this.stepsLable.Domain;
            }
            break;
          case 'module':
            if ( this.trainingService.contentCreationData?.SkillObj?.Name) {
              this.items[2].label = this.getUpdatedLabel(this.stepsLable.Skills, this.trainingService.contentCreationData?.SkillObj?.Name);
            }
            break;
          case 'topic':
            if ( this.trainingService.contentCreationData?.ModuleObj?.Name) {
              this.items[3].label = this.getUpdatedLabel(this.stepsLable.Module, this.trainingService.contentCreationData?.ModuleObj?.Name);
            }
            break;
          case 'sub-topic':
            if ( this.trainingService.contentCreationData?.TopicObj?.Name) {
              this.items[4].label = this.getUpdatedLabel(this.stepsLable.Topic, this.trainingService.contentCreationData?.TopicObj?.Name);
            }
            break;
          case 'review':
            if ( this.trainingService.contentCreationData?.SubTopicObj?.Name) {
              this.items[5].label = this.getUpdatedLabel(this.stepsLable.SubTopic, this.trainingService.contentCreationData?.SubTopicObj?.Name);
            }
            break;
                    
          default:
            break;
        }
    } catch (error) {
      console.log(error)
    }
  }

  private getUpdatedLabel(label: any, title: string) {
    return label +  ' [' + title + ']';
  }

  stepsLableValue: any[] = [];
  getContentSelectedData(): any[] {
    this.stepsLableValue = [];

    let keyName = ['TrainingTypeObj', 'DomainObj', 'SkillObj', 'ModuleObj', 'TopicObj', 'SubTopicObj']
    keyName.forEach(key => {
      if (this.trainingService.contentCreationData[key]) {
        // console.log(141, this.trainingService.contentCreationData[key].Name);
        let updatedName = this.trainingService.contentCreationData[key].Name.split('-');
        updatedName = updatedName[0];
        this.stepsLableValue.push(updatedName)
      }
    });
    // console.log('selectedLabel',this.stepsLableValue);
    return this.stepsLableValue;
  }
}
