import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { ProjectsDashboardRoutingModule } from './projects-dashboard/projectsDashboard-routing.module';
import { AddProjectRoutingModule } from './add-project/addProject-routing.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  {
    path: 'project-detail/:id',
    component: ProjectDetailComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProjectsDashboardRoutingModule,
    AddProjectRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
