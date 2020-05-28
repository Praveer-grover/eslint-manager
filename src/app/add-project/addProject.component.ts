import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { projectService } from '../../../core/services/projectService';

@Component({
  selector: 'add-project',
  templateUrl: './addProject.component.html',
  styleUrls: ['./addProject.component.scss']
})
export class AddProjectComponent {

  projectName: string;
  projectPath: string;
  eslintCommand: string;
  jsonOutputPath: string;

  constructor(private router: Router) { }

  addProject(): void {
    projectService.addProject(this.projectName, this.projectPath, this.eslintCommand, this.jsonOutputPath);

    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 500);
  }

}
