import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  name;
  projectList;
  employeeList;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.getProjects();
    this.getemployees();
  }

  getProjects() {
    this.http.get(environment.baseUrl+'admin/getProjects')
      .subscribe((responseData) => {
        this.projectList = responseData;
      });
  }

  getemployees() {
    this.http.get(environment.baseUrl+'admin/getemployees')
      .subscribe((responseData:any) => {
        this.employeeList = responseData.data;
      });
  }

}
