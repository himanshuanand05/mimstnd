import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContentCreationComponent } from './upload-content-creation.component';

describe('UploadContentCreationComponent', () => {
  let component: UploadContentCreationComponent;
  let fixture: ComponentFixture<UploadContentCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadContentCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
