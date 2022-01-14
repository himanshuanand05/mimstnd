import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedTrainingComponent } from './need-training.component';

describe('NeedTrainingComponent', () => {
  let component: NeedTrainingComponent;
  let fixture: ComponentFixture<NeedTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
