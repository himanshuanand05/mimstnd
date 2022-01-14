import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  evaluationForm: FormGroup;
  scheduleList: any[];
  participantList: any[];
  selectedSchedule: any;
  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService
  ) { 
    this.scheduleList = [
      {Id: 1, Name: '2nd Dec Training', EvaluationDate: new Date(),
       sessions: [{SessionNmber: 1, Name: 'Session 1' }] }
    ];

    this.participantList = [
      {Id: 1, Name: 'John' },
      {Id: 2, Name: 'Bob' }
    ];

    this.selectedSchedule = this.scheduleList[0];

  }

  ngOnInit(): void {
    this.evaluationForm = this.fb.group({
      scheduleId: [null, [Validators.required]],
      session: [null, [Validators.required]],
      participant: [null, [Validators.required]],
      feedbackRating: this.fb.array([]),
    });
    this.getEvaluation();
  }

  newRating(data: any): FormGroup {
    return this.fb.group({
      Id: [data.Id],
      Module: [data.Module],
      Skill: [data.Skill],
      Topic: [data.Topic],
      SubTopic: [data.SubTopic],
      Score: [data.Score, [Validators.min(1)]],
      Suggestion: ['']
    })
  }
  
  processEvaluationList(res: any[]) {
    try {
      res.forEach((x: any) => {
        let temp = {Id: x.Id, Module: x.Module, Skill: x.Skill, Topic: x.Topic, SubTopic: x.SubTopic, Score: 0};
        this.feedbackRatingFa.push(this.newRating(temp));
      });
      console.log(this.evaluationForm.value);

    } catch (error) {
      console.log(error)
    }
  }

  getEvaluation() {
    let res = [
      {Id: 1, Module: 'Module 1', Skill: 'Skill 1', Topic: 'Topic 1', SubTopic: 'Sub Topic 1'},
      {Id: 2, Module: 'Module 2', Skill: 'Skill 2', Topic: 'Topic 2', SubTopic: 'Sub Topic 2'},
    ];

    this.processEvaluationList(res);
  }


  get feedbackRatingFa() : FormArray {
    return this.evaluationForm.get('feedbackRating') as FormArray;
  }

  get f(): { [key: string]: AbstractControl; } {
    return this.evaluationForm.controls;
  }


  onSubmit() {
    let formValues = this.evaluationForm.value;
    console.log(formValues);
  }

}
