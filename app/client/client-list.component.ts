import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';


@Component({
    selector: 'client-list',
    template: `
        <h2>Clients</h2>
        <ul class="clients">
            <li *ngFor="let client of clients" [class.selected]="client === selectedClient" (click)="onSelect(client)">
                <span class="badge">{{client.id}}</span> {{client.name}}
            </li>
        </ul>
        <client-detail [client]="selectedClient"></client-detail>`,
    styles: [`
      .selected {
        background-color: #CFD8DC !important;
        color: white;
      }
      .clients {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 15em;
      }
      .clients li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
      }
      .clients li.selected:hover {
        background-color: #BBD8DC !important;
        color: white;
      }
      .clients li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
      }
      .clients .text {
        position: relative;
        top: -3px;
      }
      .clients .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #607D8B;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
      }
    `],
    providers: [ClientService]
})
export class ClientListComponent implements OnInit {
    clients: Client[];
    selectedClient: Client;
    constructor(private clientService: ClientService) { }
    getClients(): void {
        this.clientService.getClients().then(clients => this.clients = clients);
    }
    ngOnInit(): void {
        this.getClients();
    }
    onSelect(client: Client): void {
        this.selectedClient = client;
    }
}