import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailInfoComponent } from './task-detail-info.component';

describe('TaskDetailInfoComponent', () => {
  let component: TaskDetailInfoComponent;
  let fixture: ComponentFixture<TaskDetailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
