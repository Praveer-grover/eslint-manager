import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { projectService } from '../../../core/services/projectService';

@Component({
  selector: 'add-project',
  templateUrl: './addProject.component.html',
  styleUrls: ['./addProject.component.scss']
})
export class AddProjectComponent implements OnInit {

  projectName: string;
  projectPath: string;
  eslintCommand: string;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  addProject() {
    projectService.addProject(this.projectName, this.projectPath, this.eslintCommand);

    setTimeout(() => { 
      this.router.navigateByUrl('/home');
    }, 500);
  }

}
