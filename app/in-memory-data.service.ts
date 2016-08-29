import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let clients = [
            {id: 11, name: 'Mr. Nice'},
            {id: 12, name: 'Narco'},
            {id: 13, name: 'Bombasto'},
            {id: 14, name: 'Celeritas'},
            {id: 15, name: 'Magneta'},
            {id: 16, name: 'RubberMan'},
            {id: 17, name: 'Dynama'},
            {id: 18, name: 'Dr IQ'},
            {id: 19, name: 'Magma'},
            {id: 20, name: 'Tornado'}
        ],
        projects = [
            {id: 1, name: 'Project 1', client : '12', status : 'In progress', dateCreated : ''},
            {id: 2, name: 'Project 2', client : '12', status : 'In progress', dateCreated : ''},
            {id: 3, name: 'Project 3', client : '12', status : 'In progress', dateCreated : ''},
            {id: 4, name: 'Project 4', client : '16', status : 'In progress', dateCreated : ''},
            {id: 5, name: 'Project 5', client : '12', status : 'In progress', dateCreated : ''},
            {id: 6, name: 'Project 6', client : '12', status : 'In progress', dateCreated : ''},
            {id: 7, name: 'Project 7', client : '20', status : 'In progress', dateCreated : ''},
            {id: 8, name: 'Project 8', client : '12', status : 'In progress', dateCreated : ''},
            {id: 9, name: 'Project 9', client : '12', status : 'In progress', dateCreated : ''},
            {id: 10, name: 'Project 10', client : '11', status : 'In progress', dateCreated : ''}
        ];
        return {clients, projects};
    }
}