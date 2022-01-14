import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyTrainingComponent } from './apply-training.component';

describe('ApplyTrainingComponent', () => {
  let component: ApplyTrainingComponent;
  let fixture: ComponentFixture<ApplyTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
