import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { projectDao } from '../../core/dao/projectDao';
import { ElectronService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    this.determineHomePage();
  }

  private determineHomePage() {
    const proejcts = projectDao.getAllSavedProjects();
    if (proejcts && proejcts.length > 0) {
      // projects dashboard
      this.router.navigateByUrl("/home");
      return;
    }
    // add projects
    this.router.navigateByUrl("/add-project");
  }

}
