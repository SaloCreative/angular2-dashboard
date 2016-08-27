import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Client }           from './client';

@Injectable()
export class ClientSearchService {
    constructor(private http: Http) {}
    search(term: string): Observable<Client[]> {
        return this.http
            .get(`dist/clients/?name=${term}`)
            .map((r: Response) => r.json().data as Client[]);
    }
}