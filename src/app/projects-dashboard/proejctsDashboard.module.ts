import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsDashboardRoutingModule } from './projectsDashboard-routing.module';

import { ProjectsDashboardComponent } from './projectsDashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProjectsDashboardComponent],
  imports: [CommonModule, SharedModule, ProjectsDashboardRoutingModule]
})
export class ProjectsDashboardModule {}
