import { Component, OnInit,OnChanges } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'worklog-manager';

  constructor(private router: Router) { }

  ngOnInit(): void {


  //   if ( localStorage.getItem('mail') == null){

  //      this.redirection();
  //  }

  }

 // tslint:disable-next-line: typedef
//  redirection(){

//   this.router.navigate(['login']);
//  }

}
