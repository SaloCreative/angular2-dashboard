import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
    selector: 'project-detail',
    templateUrl: 'views/projects/project-detail.component.html',
    providers: [ProjectService]
})
export class ProjectDetailComponent implements OnInit {
    project: Project;

    constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.projectService.getProject(id)
                .then(project => this.project = project);
        });
    }

    save(): void {
        this.projectService.update(this.project)
            .then(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }
}