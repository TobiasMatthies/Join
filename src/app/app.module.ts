import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
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
import { DataStorageService } from './services/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: resourceProviderFactory,
      deps: [DataStorageService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function resourceProviderFactory(provider: DataStorageService) {
  return () => provider.fetchData();
}
