import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveNeedComponent } from './approve-need.component';

describe('ApproveNeedComponent', () => {
  let component: ApproveNeedComponent;
  let fixture: ComponentFixture<ApproveNeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveNeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
