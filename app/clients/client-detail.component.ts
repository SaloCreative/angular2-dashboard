import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
    selector: 'client-detail',
    templateUrl: 'views/clients/client-detail.component.html',
    providers: [ClientService]
})
export class ClientDetailComponent {
    client: Client;
    errorMessage:string;

    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.clientService.getClient(id)
                .subscribe(client => this.client = client,
                error => this.errorMessage = <any>error);
        });
    }

    save(): void {
        this.clientService.update(this.client)
            .subscribe(error => this.errorMessage = <any>error);
    }

    goBack(): void {
        window.history.back();
    }
}