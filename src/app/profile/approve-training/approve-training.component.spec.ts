import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTrainingComponent } from './approve-training.component';

describe('ApproveTrainingComponent', () => {
  let component: ApproveTrainingComponent;
  let fixture: ComponentFixture<ApproveTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
