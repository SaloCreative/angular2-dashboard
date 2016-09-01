import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';
import { Project, ProjectMeta } from './project';
import { ProjectService } from './project.service';
import { OrderBy } from "../app/app.orderBy";


@Component({
    selector: 'project-list',
    templateUrl: 'views/projects/project-list.component.html',
    pipes: [PaginatePipe, OrderBy],
    providers: [ProjectService, PaginationService],
    directives: [PaginationControlsCmp]
})
export class ProjectListComponent implements OnInit {
    projects:Project[];
    projectsMeta:ProjectMeta[];
    selectedProject:Project;
    errorMessage:string;
    private total: number;

    page: number = 1;
    loading: boolean;

    constructor(private router:Router,
                private projectService:ProjectService) {
    }

    getProjectsByPage(page: number) {
        let perPage = 50;
        this.loading = true;
        this.projectService.getProjectsByPage(page, perPage)
            .subscribe(
                projects => {
                    this.projects = projects;
                    this.total = 1616;
                    this.page = page;
                    this.loading = false;
                },
                error =>  this.errorMessage = <any>error);
    }

    getProjectsMeta() {
        this.projectService.getProjectsMeta()
            .subscribe(
                projectsMeta => {
                    this.projectsMeta = projectsMeta;
                },
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
        this.getProjectsByPage(1);
        this.getProjectsMeta();
    }

}
