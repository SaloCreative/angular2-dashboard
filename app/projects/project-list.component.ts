import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';
import { Project } from './project';
import { ProjectService } from './project.service';
import { OrderBy } from "../app/app.orderBy"


@Component({
    selector: 'project-list',
    templateUrl: 'views/projects/project-list.component.html',
    pipes: [PaginatePipe, OrderBy],
    providers: [ProjectService, PaginationService],
    directives: [PaginationControlsCmp]
})
export class ProjectListComponent implements OnInit {
    projects:Project[];
    selectedProject:Project;
    errorMessage:string;

    constructor(private router:Router,
                private projectService:ProjectService) {
    }

    getProjects():void {
        this.projectService.getProjects()
            .then(projects => this.projects = projects,
                error =>  this.errorMessage = <any>error);
    }

    add(name:string):void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.projectService.create(name)
            .then(project => {
                this.projects.push(project);
                this.selectedProject = null;
            });
    }

    ngOnInit():void {
        this.getProjects();
    }

}
