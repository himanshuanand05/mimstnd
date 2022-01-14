import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTrainerComponent } from './approve-trainer.component';

describe('ApproveTrainerComponent', () => {
  let component: ApproveTrainerComponent;
  let fixture: ComponentFixture<ApproveTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
