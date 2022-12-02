import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUrgencyComponent } from './choose-urgency.component';

describe('ChooseUrgencyComponent', () => {
  let component: ChooseUrgencyComponent;
  let fixture: ComponentFixture<ChooseUrgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseUrgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseUrgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
