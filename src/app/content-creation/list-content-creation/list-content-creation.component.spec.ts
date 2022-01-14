import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContentCreationComponent } from './list-content-creation.component';

describe('ListContentCreationComponent', () => {
  let component: ListContentCreationComponent;
  let fixture: ComponentFixture<ListContentCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContentCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
