import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent implements OnInit {

  managerList;
  projectList;
  ok = "vh";

  form = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectManager: new FormControl('', Validators.required),
    projectDescription: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getManagers();

  }
  // tslint:disable-next-line: typedef
  addProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const projectName = form.value.projectName;
    const projectManager = form.value.projectManager;
    const projectDesc = form.value.projectDescription;
    const project = { name: projectName, projectmanager: projectManager, projectdesc: projectDesc };

    this.http.post<{ message: string }>(environment.baseUrl + 'admin/addProjects', project)
      .subscribe((responseData) => {

      });
    console.log(this.projectList);
    this.getManagers()

    form.reset();
  }

  // tslint:disable-next-line: typedef
  getManagers() {
    this.http.get(environment.baseUrl + 'admin/getManagers')
      .subscribe((responseData) => {
        this.managerList = responseData;
      });
  }

  // tslint:disable-next-line: typedef

}
