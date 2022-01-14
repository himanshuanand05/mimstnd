import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoaderOverlayService } from '../common/loader-overlay/loader-overlay.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(
    public trainingService: TrainingService,
    private messageService: MessageService,
    private router: Router,
    private loaderOverlayService: LoaderOverlayService
  ) { }

  ngOnInit(): void {
    console.log(this.trainingService.contentCreationData)
  }

  save() {
    let trainingContentObject = {
      "TrainingContentName": this.trainingService.contentCreationData.TrainingContentName,
      "Duration": this.trainingService.contentDuration,
      "ProjectId": 0,
      "TrainingTypeId": this.trainingService.contentCreationData.TrainingTypeObj.Id,
      "StatusId": 1,
      "DomainId": this.trainingService.contentCreationData.DomainObj.Id,
      "SkillId": this.trainingService.contentCreationData.SkillObj.Id,
      "ModuleId": this.trainingService.contentCreationData.ModuleObj.Id,
      "TopicId": this.trainingService.contentCreationData.TopicObj.Id,
      "SubTopicId": this.trainingService.contentCreationData.SubTopicObj.Id,
      "ApprovedBy": 1,
      "ApprovedOn": Date.now,
      "CreatedBy": 1,
      "ModifiedBy": 1,
      "CreatedOn": Date.now,
      "ModifiedOn": Date.now
    }
    console.log(45, this.trainingService.contentCreationData.SubTopicObj);

    this.loaderOverlayService.openLoader();
    this.trainingService.addTrainingContent(trainingContentObject).subscribe(res => {
      this.loaderOverlayService.removeLoader();
      console.log(50, res);
      this.messageService.add({ severity: 'success', summary: `Training Content added successfully.` });
      this.trainingService.resetContentCreationDataData();
      setTimeout(() => {
        this.router.navigate(['/list-content']);
      }, 1000);
    })
  }

  back(){
    this.router.navigate(['content-creation/sub-topic']);
  }
}
