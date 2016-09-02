import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PaginatedResult } from '../shared/pagination';
import { RequestResult } from '../shared/requestHandler';
import { Project, ProjectMeta, ProjectStatus } from './project';
import { Api } from '../app/app.endpoints';

@Injectable()
export class ProjectService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private projectsUrl = Api.getEndPoint('projects');

    constructor(private http: Http) { }

    getProjectsByPage(page: number, perPage: number): Observable<PaginatedResult<Project[]>> {
        var projectsResult: PaginatedResult<Project[]> = new PaginatedResult<Project[]>();
        return this.http.get(this.projectsUrl + '?perPage=' + perPage + '&page=' + page)
            .map((res: Response) => {
                let result = res.json();
                projectsResult.result = result.data;
                projectsResult.total = result.total;
                return projectsResult;
            })
            .catch(this.observableHandleError);
    }

    getProject(id: number): Observable<Project> {
        return this.http.get(this.projectsUrl + '/' + id)
            .map(res => <Project> res.json())
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

    update(project: Project): Observable<RequestResult> {
        var projectsUpdate: RequestResult = new RequestResult();
        let options = new RequestOptions({ headers: this.headers });
        let body = JSON.stringify(project);
        let url = `${this.projectsUrl}/${project.fldProjectID}`;
        return this.http
            .put(url, body, options)
            .map((res: Response) => {
                let result = res.json();
                projectsUpdate.status = result.status;
                return projectsUpdate;
            })
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