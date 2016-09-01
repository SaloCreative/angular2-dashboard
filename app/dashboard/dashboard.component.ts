import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../clients/client';
import { ClientService } from '../clients/client.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'views/dashboard/dashboard.component.html',
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
            .then(clients => this.clients = clients);
        console.log(this.clients);
    }

    gotoDetail(client: Client): void {
        let link = ['/clients', client.fldClientID];
        this.router.navigate(link);
    }
}
