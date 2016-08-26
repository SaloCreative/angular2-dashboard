import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../clients/client';
import { ClientService } from '../clients/client.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'partials/dashboard/dashboard.component.html',
    providers: [ClientService]
})
export class DashboardComponent implements OnInit {

    clients: Client[] = [];

    constructor(
        private router: Router,
        private clientService: ClientService
    ) { }

    ngOnInit(): void {
        this.clientService.getClients()
            .then(clients => this.clients = clients.slice(1, 5));
    }

    gotoDetail(client: Client): void {
        let link = ['/client', client.id];
        this.router.navigate(link);
    }
}
