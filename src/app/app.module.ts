import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryComponent } from './customComponents/button-primary/button-primary.component';
import { HeaderComponent } from './headers/header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { LayoutComponent } from './layout/layout.component';
import { FilterTasksPipe } from './board/filter-tasks.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskDetailInfoComponent } from './board/task-detail-info/task-detail-info.component';
import { ChooseUrgencyComponent } from './add-task/choose-urgency/choose-urgency.component';
import { TaskDetailEditComponent } from './board/task-detail-edit/task-detail-edit.component';
import { AddTaskOverlayComponent } from './add-task/add-task-overlay/add-task-overlay.component';
import { FilterPipe } from './contacts/filter.pipe';
import { AddContactComponent } from './contacts/contact-overlay/contact-overlay.component';
import { ConfirmDialogComponent } from './board/task-detail-info/confirm-dialog/confirm-dialog.component';
import { HelpSectionComponent } from './help-section/help-section.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { BoardColumnComponent } from './board/board-column/board-column.component';
import { AddTaskResponsiveHeaderComponent } from './headers/add-task-responsive-header/add-task-responsive-header.component';
import { ContactDetailViewComponent } from './contacts/contact-detail-view/contact-detail-view.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    AddTaskComponent,
    BoardComponent,
    ContactsComponent,
    ButtonPrimaryComponent,
    HeaderComponent,
    NavbarComponent,
    LayoutComponent,
    FilterTasksPipe,
    TaskDetailInfoComponent,
    ChooseUrgencyComponent,
    TaskDetailEditComponent,
    AddTaskOverlayComponent,
    FilterPipe,
    AddContactComponent,
    ConfirmDialogComponent,
    HelpSectionComponent,
    LegalNoticeComponent,
    BoardColumnComponent,
    AddTaskResponsiveHeaderComponent,
    ContactDetailViewComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
