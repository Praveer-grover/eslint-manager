import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './addProject.component';

const routes: Routes = [
  {
    path: 'add-project',
    component: AddProjectComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProjectRoutingModule {}
