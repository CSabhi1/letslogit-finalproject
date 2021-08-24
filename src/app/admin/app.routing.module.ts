import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminReportsComponent} from './admin-reports/admin-reports.component';



const routes: Routes = [
{path: 'adminp' , component: AdminHomeComponent },
{path: 'adminp/reports' , component: AdminReportsComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})

export class AppAdminRoutingModule {}
