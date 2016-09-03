import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';
import { PaginatedResult } from '../shared/pagination';
import { Project, ProjectMeta } from './project';
import { ProjectService } from './project.service';


@Component({
    selector: 'project-list',
    templateUrl: 'views/projects/project-list.component.html',
    pipes: [PaginatePipe],
    providers: [ProjectService, PaginationService],
    directives: [PaginationControlsCmp]
})
export class ProjectListComponent {
    projects:Project[];
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
            .subscribe((projectsResult: PaginatedResult<Project[]>) => {
                    this.projects = projectsResult.result;
                    this.total = projectsResult.total;
                    this.page = page;
                    this.loading = false;
                },
                error =>  this.errorMessage = <any>error);
    }

    /*getProjectsMeta() {
        this.projectService.getProjectsMeta()
            .subscribe(
                projectsMeta => {
                    this.projectsMeta = projectsMeta;
                },
                error =>  this.errorMessage = <any>error);
    }*/

    add(name:string):void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.projectService.create(name)
            .subscribe(project => {
                this.projects.push(project);
                this.selectedProject = null;
            });
    }

    ngOnInit():void {
        this.getProjectsByPage(1);
        this.getProjectsMeta();
    }

}
