import { NgModule } from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';

import { AppComponent } from './app.component';
import { routing }  from './app.routing';

import { ClientListComponent }  from '../clients/client-list.component';
import { ClientDetailComponent }    from '../clients/client-detail.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {NotFoundComponent} from "../error/404.component";

@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      routing
  ],
  declarations: [
      AppComponent,
      ClientListComponent,
      ClientDetailComponent,
      DashboardComponent,
      NotFoundComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }