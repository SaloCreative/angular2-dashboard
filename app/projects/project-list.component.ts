import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from './project';
import { ProjectService } from './project.service';


@Component({
    selector: 'project-list',
    templateUrl: 'views/projects/project-list.component.html',
    providers: [ProjectService]
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

    delete(project:Project):void {
        this.projectService
            .delete(project.id)
            .then(() => {
                this.projects = this.projects.filter(h => h !== project);
                if (this.selectedProject === project) {
                    this.selectedProject = null;
                }
            });
    }

    ngOnInit():void {
        this.getProjects();
    }

    onSelect(project:Project):void {
        this.selectedProject = project;
    }

    gotoDetail():void {
        this.router.navigate(['/projects', this.selectedProject.id]);
    }
}
