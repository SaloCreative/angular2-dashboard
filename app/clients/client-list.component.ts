import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from './client';
import { ClientService } from './client.service';


@Component({
    selector: 'client-list',
    templateUrl: 'partials/clients/client-list.component.html',
    providers: [ClientService]
})
export class ClientListComponent implements OnInit {
    clients: Client[];
    selectedClient: Client;
    constructor(
        private router: Router,
        private clientService: ClientService
    ) { }
    getClients(): void {
        this.clientService.getClients()
            .then(clients => this.clients = clients);
    }
    ngOnInit(): void {
        this.getClients();
    }
    onSelect(client: Client): void {
        this.selectedClient = client;
    }
    gotoDetail(): void {
        this.router.navigate(['/client', this.selectedClient.id]);
    }
}