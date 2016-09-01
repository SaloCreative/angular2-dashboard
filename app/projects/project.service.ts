import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from './project';

@Injectable()
export class ProjectService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private projectsAllUrl = 'http://192.168.1.150/api.intranet2.freshleafmedia.co.uk/public/api/v1/projects';  // URL to web api
    private projectsSingularUrl = 'http://192.168.1.150/api.intranet2.freshleafmedia.co.uk/public/api/v1/projects/';  // URL to w
    //private projectsAllUrl = 'http://local.api.intranet2.freshleafmedia.co.uk/api/v1/projects';
    //private projectsSingularUrl = 'http://local.api.intranet2.freshleafmedia.co.uk/api/v1/projects/';
    constructor(private http: Http) { }

    getProjects(): Promise<Project[]> {
        return this.http.get(this.projectsAllUrl)
            .toPromise()
            .then(response => response.json() as Project[])
            .catch(this.handleError);
    }

    getProjectsByPage(page: number, perPage: number): Promise<Project[]> {
        return this.http.get(this.projectsAllUrl + '?perPage=' + perPage + '&page=' + page)
            .toPromise()
            .then(response => response.json().data as Project[])
            .catch(this.handleError);
    }

    getProject(id: number): Promise<Project> {
        return this.http.get(this.projectsSingularUrl + id)
            .toPromise()
            .then(response => response.json() as Project)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        return this.http.delete(this.projectsSingularUrl + id, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Project> {
        return this.http
            .post(this.projectsSingularUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(project: Project): Promise<Project> {
        const url = `${this.projectsSingularUrl}/${project.fldProjectID}`;
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