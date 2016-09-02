import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';
import { Client } from './client';
import { ClientService } from './client.service';


@Component({
    selector: 'client-list',
    templateUrl: 'views/clients/client-list.component.html',
    pipes: [PaginatePipe],
    providers: [ClientService, PaginationService],
    directives: [PaginationControlsCmp]
})
export class ClientListComponent {
    clients: Client[];
    selectedClient: Client;
    errorMessage:string;
    private total: number;
    page: number = 1;
    loading: boolean;

    constructor(
        private router: Router,
        private clientService: ClientService
    ) { }

    getClientsByPage(page: number) {
        let perPage = 50;
        this.loading = true;
        this.clientService.getClientsByPage(page, perPage)
            .subscribe(
                clients => {
                this.clients = clients['data'];
                this.total = clients['total'];
                this.page = page;
                this.loading = false;
            },
            error =>  this.errorMessage = <any>error);
    }

    getClients(): void {
        this.clientService.getClients()
            .subscribe(clients => this.clients = clients['data'],
            error =>  this.errorMessage = <any>error);
    }

    add(fldCompanyName: string): void {
        fldCompanyName = fldCompanyName.trim();
        if (!fldCompanyName) { return; }
        this.clientService.create(fldCompanyName)
            .subscribe(client => {
                this.clients.push(client);
                this.selectedClient = null;
            });
    }

    ngOnInit(): void {
        this.getClientsByPage(1);
    }

}