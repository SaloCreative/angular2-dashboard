/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Client } from './client';
import { ClientSearchService } from './client-search.service';

@Component({
    selector: 'client-search',
    templateUrl: 'views/clients/client-search.component.html',
    providers: [ClientSearchService]
})
export class ClientSearchComponent implements OnInit {
    clients: Observable<Client[]>;
    private searchTerms = new Subject<string>();
    constructor(
        private clientSearchService: ClientSearchService,
        private router: Router) {}
    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }
    ngOnInit(): void {
        this.clients = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.clientSearchService.search(term)
                // or the observable of empty clients if no search term
                : Observable.of<Client[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Client[]>([]);
            });
    }
    gotoDetail(client: Client): void {
        let link = ['/clients', client.fldClientID];
        this.router.navigate(link);
    }
}
    */