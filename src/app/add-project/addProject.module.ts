import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProjectRoutingModule } from './addProject-routing.module';

import { AddProjectComponent } from './addProject.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddProjectComponent],
  imports: [CommonModule, SharedModule, AddProjectRoutingModule]
})
export class DetailModule {}
