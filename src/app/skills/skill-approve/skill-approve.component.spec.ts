import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillApproveComponent } from './skill-approve.component';

describe('SkillApproveComponent', () => {
  let component: SkillApproveComponent;
  let fixture: ComponentFixture<SkillApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
