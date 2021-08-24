import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  projectId;
  employeeList;
  formAddEmployee = new FormGroup({
    addemployee: new FormControl('', Validators.required)
  });
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.projectId = localStorage.getItem('projectid');
    this.getEmployeeList();
  }
  // tslint:disable-next-line: typedef
  getEmployeeList() {
    this.http.get(environment.baseUrl + 'manager/getEmployeeList')
      .subscribe((responseData) => {
        this.employeeList = responseData;
      });
  }
  // tslint:disable-next-line: typedef
  addEmployee(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const employeeid = form.value.addemployee;
    const data = { employeeid: employeeid, projectid: this.projectId };
    console.log(data);
    this.http.post<{ message: string }>(environment.baseUrl + 'manager/addEmployeetoproject', data)
      .subscribe((responseData) => {
      });
    form.reset();

  }
}
