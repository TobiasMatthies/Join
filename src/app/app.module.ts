import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryComponent } from './customComponents/button-primary/button-primary.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { LayoutComponent } from './layout/layout.component';
import { FilterTasksPipe } from './board/filter-tasks.pipe';


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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
