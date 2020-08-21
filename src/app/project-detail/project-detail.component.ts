import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projectDao } from '../../../core/dao/projectDao';
import { Project } from '../../../core/model/project';
import { projectService } from '../../../core/services/projectService';
import { ProjectReport } from '../../../core/model/projectReport';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { eslintService } from '../../../core/services/eslintService';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project: Project;
  faCog = faCog;
  report: ProjectReport;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.loadDataForProject(params.id)
    });
  }

  public runEsLint(): void {
    eslintService.runEslint(this.project);
  }

  private loadDataForProject(projectId: string): void {
    this.project = projectDao.getProject(projectId);
    projectService.getLatestReport(projectId).subscribe(report => {
      this.updateWidgetsWithReport(report);
    });
  }

  private updateWidgetsWithReport(report: ProjectReport): void {
    console.log("Display project report here");
    
    report.issues.forEach((issue) => {
      let errorsCount = 0;
      let warningsCount = 0;

      issue.issues.forEach(i => {
        if (i.severity === 1) {
          warningsCount += 1;
        } else if (i.severity === 2) {
          errorsCount += 1;
        }
      });

      (issue as any).errorsCount = errorsCount;
      (issue as any).warningsCount = warningsCount;
    });
    this.report = report;
    /**
     * How the report would look like
     * as a draft 1, just having a grid with expandable issue
     * under the expansion panel we would have the few lines of code highlighting the issue
     * 
     * A slight summary of issues:
     * - total, broken down by severity
     * 
     * 
     * as a draft 2, embed the user information into it
     */
  }

}
