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
export class ProjectDetailComponent implements OnInit {
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
                .then(project => this.project = project);
        });
        this.clientService.getClients()
            .then(clients => this.clients = clients);
        this.getProjectStatus();
    }

    save(): void {
        this.projectService.update(this.project)
            .then(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }

    onSubmit() {
        this.projectService.update(this.project);
        this.submitted = true;
        setTimeout(function() {
            this.submitted = false;
        }.bind(this), 3000);
    }

    delete():void {
        this.projectService.delete(this.project.fldProjectID)
            .then(this.goBack);
    }

    getProjectStatus() {
        this.projectService.getProjectStatus()
            .subscribe(
                projectStatus => {
                    this.projectStatus = projectStatus;
                },
                error =>  this.errorMessage = <any>error);
    }
}