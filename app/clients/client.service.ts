import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Client } from './client';
import { Api } from '../app/app.endpoints';

@Injectable()
export class ClientService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private clientsUrl = Api.getEndPoint('clients');

    constructor(private http: Http) { }

    getClients(): Promise<Client[]> {
        return this.http.get(this.clientsUrl)
            .toPromise()
            .then(response => response.json() as Client[])
            .catch(this.handleError);
    }

    getClient(id: number): Promise<Client> {
        return this.http.get(this.clientsUrl + '/' + id)
            .toPromise()
            .then(response => response.json() as Client)
            .catch(this.handleError);
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
            .post(this.clientsUrl + '/', JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(client: Client): Promise<Client> {
        const url = `${this.clientsUrl}/${client.fldClientID}`;
        return this.http
            .put(url, JSON.stringify(client), {headers: this.headers})
            .toPromise()
            .then(() => client)
            .catch(this.handleError);
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errorMessage = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errorMessage); // log to console instead
        return Promise.reject(errorMessage);
    }
}