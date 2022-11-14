import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthComponent } from './auth/auth.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent },
  { path: 'board', component: BoardComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'contacts', component: ContactsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
