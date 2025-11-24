import { Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpSectionComponent } from './help-section/help-section.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
  {
    path: '',
    component: SummaryComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'help', component: HelpSectionComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
