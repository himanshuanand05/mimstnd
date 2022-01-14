import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyTrainerComponent } from './apply-trainer.component';

describe('ApplyTrainerComponent', () => {
  let component: ApplyTrainerComponent;
  let fixture: ComponentFixture<ApplyTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
