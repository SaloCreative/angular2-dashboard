import { Component } from '@angular/core';
@Component({
    selector: 'app',
    template: `
    <h1>{{title}}</h1>
    <a routerLink="/dashboard">Dashboard</a>
    <a routerLink="/clients">Clients</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
    title = 'Dummy Intranet';
}