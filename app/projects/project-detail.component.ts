import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Project, ProjectStatus, ProjectMeta} from './project';
import { ProjectService } from './project.service';
import { Client } from '../clients/client';
import { ClientService } from '../clients/client.service';

@Component({
    selector: 'project-detail',
    templateUrl: 'views/projects/project-detail.component.html',
    providers: [ProjectService, ClientService]
})
export class ProjectDetailComponent {
    project: Project;
    clients: Client[] = [];
    projectStatus: ProjectStatus[] = [];
    submitted = false;
    private response;
    errorMessage:string;

    constructor(
        private projectService: ProjectService,
        private clientService: ClientService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.projectService.getProject(id)
                .subscribe((project: Project) => this.project = project,
                error => this.errorMessage = <any>error);
        });
        this.getClients();
        this.getProjectStatus();
    }

    getClients() {
        this.clientService.getClients()
            .subscribe(clients => {this.clients = clients;},
                error =>  this.errorMessage = <any>error);
    }

    getProjectStatus() {
        this.projectService.getProjectsMeta()
            .subscribe((projectsMeta: ProjectMeta<ProjectStatus[]>) => {
                    this.projectStatus = projectsMeta.statuses;
                    console.log(this.projectStatus);
                },
                error =>  this.errorMessage = <any>error);

    }

    onSubmit() {
        this.projectService.update(this.project)
            .subscribe(
                projectsUpdate => {
                    this.submitted = true;
                    this.response = projectsUpdate.status;
                    console.log(this.response);
                },
                error => this.errorMessage = <any>error);

    }

    delete():void {
        this.projectService.delete(this.project.fldProjectID)
            .subscribe(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }

}