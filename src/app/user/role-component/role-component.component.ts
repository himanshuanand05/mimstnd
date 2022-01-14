import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-role-component',
  templateUrl: './role-component.component.html',
  styleUrls: ['./role-component.component.scss']
})
export class RoleComponentComponent implements OnInit {

  roleForm: FormGroup;
  employeeList: any[] =[];
  projectList: any = [];
  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
  ) {
    this.roleForm = this.fb.group({
      employee: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects() {
    try {
      this.projectList = await this.trainingService.getProjects().toPromise();
    } catch (error) {
      console.log(error);
    }
    
  }
  submit() {}
}
