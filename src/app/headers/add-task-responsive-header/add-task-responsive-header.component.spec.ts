import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskResponsiveHeaderComponent } from './add-task-responsive-header.component';

describe('AddTaskResponsiveHeaderComponent', () => {
  let component: AddTaskResponsiveHeaderComponent;
  let fixture: ComponentFixture<AddTaskResponsiveHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskResponsiveHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskResponsiveHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
