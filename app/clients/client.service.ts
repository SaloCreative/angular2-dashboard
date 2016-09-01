import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Client } from './client';

@Injectable()
export class ClientService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private clientsAllUrl = 'http://local.api.intranet2.freshleafmedia.co.uk/api/v1/clients';
    private clientsSingularUrl = 'http://local.api.intranet2.freshleafmedia.co.uk/api/v1/clients/';
    //private clientsAllUrl = 'http://192.168.1.150/api.intranet2.freshleafmedia.co.uk/public/api/v1/clients';  // URL to web api
    //private clientsSingularUrl = 'http://192.168.1.150/api.intranet2.freshleafmedia.co.uk/public/api/v1/clients/';  // URL to web api

    constructor(private http: Http) { }

    getClients(): Promise<Client[]> {
        return this.http.get(this.clientsAllUrl)
            .toPromise()
            .then(response => response.json() as Client[])
            .catch(this.handleError);
    }

    getClient(id: number): Promise<Client> {
        return this.http.get(this.clientsSingularUrl + id)
            .toPromise()
            .then(response => response.json() as Client)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        let url = `${this.clientsSingularUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Client> {
        return this.http
            .post(this.clientsSingularUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(client: Client): Promise<Client> {
        const url = `${this.clientsSingularUrl}/${client.fldClientID}`;
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