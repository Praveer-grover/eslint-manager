import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { ProjectsDashboardRoutingModule } from './projects-dashboard/projectsDashboard-routing.module';
import { AddProjectRoutingModule } from './add-project/addProject-routing.module';

const routes: Routes = [
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
