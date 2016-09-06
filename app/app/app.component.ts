import { Component, ViewContainerRef } from '@angular/core';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'app',
    template: `
    <alert *ngFor="let alert of alerts;let i = index" [type]="alert.type" dismissible="true" (close)="closeAlert(i)">
                        {{ alert?.msg }}
                    </alert>
    <h1>{{title}}</h1>
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/clients" routerLinkActive="active">Clients</a>
    <a routerLink="/projects" routerLinkActive="active">Projects</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
    title = 'Dummy Intranet';
    viewContainerRef;
    public constructor(viewContainerRef:ViewContainerRef) {
     // You need this small hack in order to catch application root view container ref
     this.viewContainerRef = viewContainerRef;
     }
     public alerts:Array<Object> = [
     {
     type: 'success',
     msg: 'Oh snap! This is our super dope new dashboard. YEAH BOOOOIIII.'
     }
     ];

     public closeAlert(i:number):void {
     this.alerts.splice(i, 1);
     }
}