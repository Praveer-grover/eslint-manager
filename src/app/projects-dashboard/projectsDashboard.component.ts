import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Project } from '../../../core/model/project';
import { eslintService } from '../../../core/services/eslintService';
import { projectService } from '../../../core/services/projectService';
import { map, takeUntil } from 'rxjs/operators';
import { ProjectReport } from '../../../core/model/projectReport';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projectsDashboard.component.html',
  styleUrls: ['./projectsDashboard.component.scss']
})
export class ProjectsDashboardComponent implements OnInit, OnDestroy {

  projects$: Observable<Project[]>;
  latestReports$: { [projectId: string]: Observable<ProjectReport> } = {};

  unsubscribe$: Subject<void>;

  ngOnInit(): void {
    this.projects$ = projectService.getProjects();
    this.unsubscribe$ = new Subject();

    /**
     * also subscribe to the projects
     * whenever a new project is added
     * add an observable onto the reports of that project
     */
    this.projects$.pipe(map(projects => {
      // Get the last project added to the array
      projects.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        }
        return 0;
      });

      return projects[projects.length - 1];
    }
    ), takeUntil(this.unsubscribe$)).subscribe(project => {
      if (!this.latestReports$[project.id]) {
        this.latestReports$[project.id] = projectService.getLatestReport(project.id);
      }
    });
  }

  runEslint(project: Project): void {
    eslintService.runEslint(project);
  }

  showReport(report: ProjectReport): void {
    console.log("Report shown", report);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
