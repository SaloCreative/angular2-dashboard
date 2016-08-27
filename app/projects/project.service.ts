import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from './project';

@Injectable()
export class ProjectService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private projectsUrl = 'dist/projects';  // URL to web api

    constructor(private http: Http) { }

    getProjects(): Promise<Project[]> {
        return this.http.get(this.projectsUrl)
            .toPromise()
            .then(response => response.json().data as Project[])
            .catch(this.handleError);
    }

    getProject(id: number): Promise<Project> {
        return this.getProjects()
            .then(projects => projects.find(project => project.id === id));
    }

    delete(id: number): Promise<void> {
        let url = `${this.projectsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Project> {
        return this.http
            .post(this.projectsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(project: Project): Promise<Project> {
        const url = `${this.projectsUrl}/${project.id}`;
        return this.http
            .put(url, JSON.stringify(project), {headers: this.headers})
            .toPromise()
            .then(() => project)
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