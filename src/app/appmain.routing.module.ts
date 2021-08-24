
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {LoginComponent} from './login/login.component';
import {EmployeehomeComponent} from './employee/employeehome/employeehome.component';
import { ManagerhomeComponent } from './manager/managerhome/managerhome.component';
import { from } from 'rxjs';



const routes: Routes = [
{path: 'admin' , component: AdminHomeComponent },
{path: '' , component: LoginComponent },
{path: 'employee' , component: EmployeehomeComponent },
{path: 'manager' , component: ManagerhomeComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})

export class MainRoutingModule {}
