import { AdminHomeComponent } from './../admin/admin-home/admin-home.component';
import { AdminComponent } from './../admin/admin.component';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Errormsg = false;
  fmail = false;
  pls = false;
  form = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required)
  });
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  userLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const Email = form.value.Email;
    const Password = form.value.Password;
    const user = { mail: Email, password: Password };
    this.http.post<{ status: string, data: object }>(environment.baseUrl+'login/getuser', user)
      .subscribe((responseData) => {
        if (responseData.status == 'S') {
          if (responseData.data[0].role == 'admin') {
            const mail = responseData.data[0].email;
            const name = responseData.data[0].name;
            const id = responseData.data[0].id;
            this.showSuccess('Login Success', 'Welcome ' + name);
            this.router.navigate(['admin']);
            localStorage.setItem('role', 'admin');
            localStorage.setItem('mail', mail);
            localStorage.setItem('name', name);
            localStorage.setItem('id', id);
          }
          if (responseData.data[0].role == 'manager') {
            const mail = responseData.data[0].email;
            const name = responseData.data[0].name;
            const id = responseData.data[0].id;
            this.showSuccess('Login Success', 'Welcome ' + name);
            this.router.navigate(['manager']);
            localStorage.setItem('role', 'manager');
            localStorage.setItem('mail', mail);
            localStorage.setItem('name', name);
            localStorage.setItem('id', id);
          }

          if (responseData.data[0].role == 'employee') {
            const mail = responseData.data[0].email;
            const name = responseData.data[0].name;
            const id = responseData.data[0].id;
            this.showSuccess('Login Success', 'Welcome ' + name);
            this.router.navigate(['employee']);
            localStorage.setItem('role', 'employee');
            localStorage.setItem('mail', mail);
            localStorage.setItem('name', name);
            localStorage.setItem('id', id);
          }
        } else if (responseData.status == 'E') {
          this.Errormsg = true;
        }
      });
  }
  forgotPassword(mail) {
    if (mail == null || mail == undefined || mail == "") {
      this.fmail = true
    } else {
      this.fmail = false;
      this.pls = true;
      const data = { mail: mail };
      this.http.post<{ status: string, data: object }>(environment.baseUrl+'login/forgot', data)
        .subscribe((responseData) => {})
    }
  }
  showSuccess(title, message) {
    this.toastr.success(message, title, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }
  showWarning(title, message) {
    this.toastr.warning(message, title, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }

}
