import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../clients/client';
import { ClientService } from '../clients/client.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'views/dashboard/dashboard.component.html',
    providers: [ClientService]
})
export class DashboardComponent {

    clients: Client[] = [];
    errorMessage:string;

    constructor(
        private router: Router,
        private clientService: ClientService
    ) { }

    ngOnInit(): void {
        this.clientService.getClients()
            .subscribe(clients => this.clients = clients['data'],
                error => this.errorMessage = <any>error);
    }

    gotoDetail(client: Client): void {
        let link = ['/clients', client.fldClientID];
        this.router.navigate(link);
    }
}
