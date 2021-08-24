
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {EmployeehomeComponent} from './employeehome/employeehome.component';
import {EmployeesummaryComponent} from './employeesummary/employeesummary.component';


import { from } from 'rxjs';



const routes: Routes = [
{path: 'employee' , component: EmployeehomeComponent },
{path: 'employeesummary' , component: EmployeesummaryComponent },


];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule],
  declarations: [EmployeesummaryComponent]
})

export class EmployeeRoutingModule {}
