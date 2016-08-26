import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

import { ClientListComponent }  from '../client/client-list.component';

import { ClientDetailComponent } from '../client/client-detail.component';

@NgModule({
  imports:      [
      BrowserModule,
      FormsModule
  ],
  declarations: [
      AppComponent,
      ClientListComponent,
      ClientDetailComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }