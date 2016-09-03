import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Client } from './client';
import { Api } from '../app/app.endpoints';

@Injectable()
export class ClientService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private clientsUrl = Api.getEndPoint('clients');
    private clientUrl = Api.getEndPoint('client');

    constructor(private http: Http) { }

    getClientsByPage(page: number, perPage: number): Observable<Client[]> {
        return this.http.get(this.clientsUrl + '?perPage=' + perPage + '&page=' + page)
            .map(res => <Client[]> res.json())
            .catch(this.observableHandleError);
    }

    getClients(): Observable<Client[]> {
        return this.http.get(this.clientsUrl)
            .map(res => <Client[]> res.json().data)
            .catch(this.observableHandleError);
    }

    getClient(id: number): Observable<Client> {
        return this.http.get(this.clientUrl + id)
            .map(res => <Client> res.json())
            .catch(this.observableHandleError);
    }

    delete(id: number): Observable<void> {
        return this.http.delete(this.clientsUrl + '/' + id, {headers: this.headers})
            .map(() => null)
            .catch(this.observableHandleError);
    }

    create(name: string): Observable<Client> {
        return this.http
            .post(this.clientsUrl + '/', JSON.stringify({name: name}), {headers: this.headers})
            .map(res => res.json().data)
            .catch(this.observableHandleError);
    }

    update(client: Client): Observable<Client> {
        const url = `${this.clientsUrl}/${client.fldClientID}`;
        return this.http
            .put(url, JSON.stringify(client), {headers: this.headers})
            .map(() => client)
            .catch(this.observableHandleError);
    }

    private observableHandleError (error: any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(error);
        return Observable.throw(errorMessage || 'Server error');
    }
}