import { Component } from '@angular/core';
@Component({
    selector: 'app',
    template: `
    <h1>{{title}}</h1>
    <client-list></client-list>
  `
})
export class AppComponent {
    title = 'Dummy Intranet';
}