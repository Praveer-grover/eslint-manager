import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projectsDashboard.component.html',
  styleUrls: ['./projectsDashboard.component.scss']
})
export class ProjectsDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { 
    // create an observer for list of projects and bind it to 
    // UI
    // give an option of add project
    console.log("Working");
  }

}
