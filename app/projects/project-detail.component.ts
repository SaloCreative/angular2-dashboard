import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Project, ProjectStatus } from './project';
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
                .subscribe(project => this.project = project,
                error => this.errorMessage = <any>error);
        });
        this.getClients();
        this.getProjectStatus();
    }

    getClients() {
        this.clientService.getClients()
            .subscribe(clients => this.clients = clients['data'],
                error =>  this.errorMessage = <any>error);
    }

    getProjectStatus() {
        this.projectService.getProjectStatus()
            .subscribe(
                projectStatus => {
                    this.projectStatus = projectStatus;
                },
                error =>  this.errorMessage = <any>error);
    }

    onSubmit() {
        this.projectService.update(this.project)
            .subscribe(error => this.errorMessage = <any>error);
    }

    delete():void {
        this.projectService.delete(this.project.fldProjectID)
            .subscribe(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }

}