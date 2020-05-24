import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsDashboardComponent } from './projectsDashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: ProjectsDashboardComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsDashboardRoutingModule {}
