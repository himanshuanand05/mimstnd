import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  scheduleList: any[] = [];
  feedbackRatingList: any[] = [];
  feedbackSuggestionList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      scheduleId: [null, [Validators.required]],
      feedbackRating: this.fb.array([]),
      feedbackSuggestion: this.fb.array([]),
    });

    this.getAllFeedback();
    this.getScheduleList();
   
  }

  newRating(data: any): FormGroup {
    return this.fb.group({
      Id: [data.Id],
      Title: [data.Title],
      Score: [data.Score, [Validators.min(1)]]
    })
  }

  newSuggestion(data: any): FormGroup {
    return this.fb.group({
      Id: [data.Id],
      Title: [data.Title],
      Suggestion: [data.Suggestion]
    })
  }
  
  get feedbackRatingFa() : FormArray {
    return this.feedbackForm.get('feedbackRating') as FormArray;
  }

  get feedbackSuggestionFa() : FormArray {
    return this.feedbackForm.get('feedbackSuggestion') as FormArray;
  }

  get f(): { [key: string]: AbstractControl; } {
    return this.feedbackForm.controls;
  }

  onSubmit() {
    let formValues = this.feedbackForm.value;
    formValues.feedbackSuggestion = formValues.feedbackSuggestion.filter((x:any) => x.Suggestion);
    console.log(formValues);
  }

  processFeedbackList(feedbackList: any[]) {
    try {
      feedbackList.filter(x => x.Type == 1).forEach((x: any) => {
        let temp = {Id: x.Id, Title: x.Title, Score: 0};
        this.feedbackRatingFa.push(this.newRating(temp));
      });
  
      feedbackList.filter(x => x.Type == 2).forEach((x: any) => {
        let temp = {Id: x.Id, Title: x.Title, Suggestion: ''};
        this.feedbackSuggestionFa.push(this.newSuggestion(temp));
      });
    } catch (error) {
      console.log(error)
    }
    
  }

  getAllFeedback(){
    this.trainingService.getAllFeedback().subscribe((res:any)=>{
      this.processFeedbackList(res);
    })
  }

  getScheduleList(){
    this.trainingService.getScheduleList().subscribe((res:any)=>{
      this.scheduleList = res;
    })
  }
}
