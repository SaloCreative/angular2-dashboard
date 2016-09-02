import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Project, ProjectMeta, ProjectStatus } from './project';
import { Api } from '../app/app.endpoints';

@Injectable()
export class ProjectService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private projectsUrl = Api.getEndPoint('projects');

    constructor(private http: Http) { }

    getProjectsByPage(page: number, perPage: number): Observable<Project[]> {
        return this.http.get(this.projectsUrl + '?perPage=' + perPage + '&page=' + page)
            .map(res => <Project[]> res.json())
            .catch(this.observableHandleError);
    }

    getProjectsMeta(): Observable<ProjectMeta[]> {
        return this.http.get(this.projectsUrl + '/meta')
            .map(res => <ProjectMeta[]> res.json().total)
            .catch(this.observableHandleError);
    }

    getProjectStatus(): Observable<ProjectStatus[]> {
        return this.http.get(this.projectsUrl + '/statuses')
            .map(res => <ProjectStatus[]> res.json())
            .catch(this.observableHandleError);
    }

    getProject(id: number): Observable<Project> {
        return this.http.get(this.projectsUrl + '/' + id)
            .map(res => <Project> res.json())
            .catch(this.observableHandleError);
            //.toPromise()
            //.then(response => response.json() as Project)
            //.catch(this.handleError);
    }

    delete(id: number): Observable<void> {
        return this.http.delete(this.projectsUrl + '/' + id, {headers: this.headers})
            .map(() => null)
            .catch(this.observableHandleError);
    }

    create(name: string): Observable<Project> {
        return this.http
            .post(this.projectsUrl + '/', JSON.stringify({name: name}), {headers: this.headers})
            .map(res => res.json().data)
            .catch(this.observableHandleError);
    }

    update(project: Project): Observable<Project> {
        const url = `${this.projectsUrl}/${project.fldProjectID}`;
        return this.http
            .put(url, JSON.stringify(project), {headers: this.headers})
            .map(() => project)
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