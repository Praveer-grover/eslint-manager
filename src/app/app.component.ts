import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { projectDao } from '../../core/dao/projectDao';
import { ElectronService } from './core/services';
import { projectService } from '../../core/services/projectService';
import demoProjects from './demoProjects.json';
import { Project } from '../../core/model/project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  projects: Project[];
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    this.pushMockData();
    this.determineHomePage();
  }

  public loadProjectPage(p: Project): void {
    console.log(p);
  }

  private pushMockData(): void {

    const projectsData: any[] = demoProjects;
    projectsData.forEach((data) => {
      projectService.addProject(data.name, data.path, data.executeCommand, data.jsonReportPath);
    })
  }

  private determineHomePage() {
    this.projects = projectDao.getAllSavedProjects();
    if (this.projects && this.projects.length > 0) {
      // projects dashboard
      this.router.navigateByUrl("/home");
      return;
    }
    // add projects
    this.router.navigateByUrl("/add-project");
  }

}
