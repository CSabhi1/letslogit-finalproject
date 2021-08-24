import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-employee-manager',
  templateUrl: './add-employee-manager.component.html',
  styleUrls: ['./add-employee-manager.component.css']
})
export class AddEmployeeManagerComponent implements OnInit {

  form = new FormGroup({
    Name: new FormControl('', Validators.required),
    User: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  addManagerEmployee(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const UserName = form.value.Name;
    const UserRole = form.value.User;
    const Email = form.value.Email;
    const Password = form.value.Password;

    const user = { name: UserName, role: UserRole, email: Email, password: Password };

    this.http.post<{ message: string }>(environment.baseUrl + 'admin/addUser', user)
      .subscribe((responseData) => {
      });
    form.reset();
  }

}
