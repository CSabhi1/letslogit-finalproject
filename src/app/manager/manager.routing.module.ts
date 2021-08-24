
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ManagerhomeComponent } from './managerhome/managerhome.component';



import { from } from 'rxjs';
import { ManagersummaryComponent } from './managersummary/managersummary.component';




const routes: Routes = [
{path: 'manager' , component: ManagerhomeComponent },
{path: 'managersummary' , component: ManagersummaryComponent },


];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule],
  declarations: [ManagersummaryComponent]
})

export class ManagerRoutingModule {}
