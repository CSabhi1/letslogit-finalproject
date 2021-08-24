import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ToastrModule } from 'ngx-toastr';

import { AppAdminRoutingModule } from './admin/app.routing.module';
import { EmployeeRoutingModule } from './employee/employee.routing.module';
import { ManagerRoutingModule } from './manager/manager.routing.module';
import { MainRoutingModule } from './appmain.routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AddProjectsComponent } from './admin/admin-home/add-projects/add-projects.component';
import { AddEmployeeManagerComponent } from './admin/admin-home/add-employee-manager/add-employee-manager.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeehomeComponent } from './employee/employeehome/employeehome.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerhomeComponent } from './manager/managerhome/managerhome.component';
import { AddEmployeeComponent } from './manager/managerhome/add-employee/add-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminNavComponent,
    AdminHomeComponent,
    AdminReportsComponent,
    AddProjectsComponent,
    AddEmployeeManagerComponent,
    LoginComponent,
    EmployeeComponent,
    EmployeehomeComponent,
    ManagerComponent,
    ManagerhomeComponent,
    AddEmployeeComponent

  ],
  imports: [
    BrowserModule,
    AppAdminRoutingModule,
    MainRoutingModule,
    EmployeeRoutingModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
