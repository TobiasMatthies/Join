import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailViewComponent } from './contact-detail-view.component';

describe('ContactDetailViewComponent', () => {
  let component: ContactDetailViewComponent;
  let fixture: ComponentFixture<ContactDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
