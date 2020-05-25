import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Project } from '../../../core/model/project';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projectsDashboard.component.html',
  styleUrls: ['./projectsDashboard.component.scss']
})
export class ProjectsDashboardComponent implements OnInit {

  projects$: Observable<Project[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router) { }


  ngOnInit(): void {
    // create an observer for list of projects and bind it to 
    // UI
    // give an option of add project

  }

}
