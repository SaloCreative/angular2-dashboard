import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Client } from './client';

@Injectable()
export class ClientService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private clientsUrl = 'dist/clients';  // URL to web api

    constructor(private http: Http) { }

    getClients(): Promise<Client[]> {
        return this.http.get(this.clientsUrl)
            .toPromise()
            .then(response => response.json().data as Client[])
            .catch(this.handleError);
    }

    getClient(id: number): Promise<Client> {
        return this.getClients()
            .then(clients => clients.find(client => client.id === id));
    }

    delete(id: number): Promise<void> {
        let url = `${this.clientsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Client> {
        return this.http
            .post(this.clientsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(client: Client): Promise<Client> {
        const url = `${this.clientsUrl}/${client.id}`;
        return this.http
            .put(url, JSON.stringify(client), {headers: this.headers})
            .toPromise()
            .then(() => client)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}