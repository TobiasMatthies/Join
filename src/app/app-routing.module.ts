import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthComponent } from './auth/auth.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpSectionComponent } from './help-section/help-section.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent },
  { path: 'board', component: BoardComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'contacts', component: ContactsComponent },
  { path:'legal-notice', component: LegalNoticeComponent },
  { path: 'help', component: HelpSectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
