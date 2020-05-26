import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../core/model/project';
import { eslintService } from '../../../core/services/eslintService';
import { projectService } from '../../../core/services/projectService';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projectsDashboard.component.html',
  styleUrls: ['./projectsDashboard.component.scss']
})
export class ProjectsDashboardComponent implements OnInit {
  projects$: Observable<Project[]>;

  ngOnInit(): void {
    this.projects$ = projectService.getProjects();
  }

  runEslint(project: Project): void {
    eslintService.runEslint(project);
  }
}
