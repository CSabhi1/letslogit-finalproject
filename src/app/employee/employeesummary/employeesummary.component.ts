import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employeesummary',
  templateUrl: './employeesummary.component.html',
  styleUrls: ['./employeesummary.component.css']
})
export class EmployeesummaryComponent implements OnInit {
  name: any;
  mail: any;
  userid: any;
  employeeProjectList: any;
  employeeProjectListId = [];
  taskStatus;
  projectSummary = [];

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.mail = localStorage.getItem('mail');
    this.userid = localStorage.getItem('id');
    this.getEmployeeProjects();
    this.getTaskCount();

  }
  getEmployeeProjects() {
    let data: any;
    data = { userid: this.userid };
    let list = [];
    this.http.post(environment.baseUrl + 'employee/getemployeeprojects', data)
      .subscribe((responseData: any) => {
        this.employeeProjectList = responseData.data;
        for (let i = 0; i < responseData.data.length; i++) {
          this.employeeProjectListId.push(responseData.data[i].id);
          list.push(responseData.data[i].id)
        }
        this.getprojectTaskCount(list);

      });
  };

  getTaskCount() {
    let data: any;
    data = { userId: this.userid };
    this.http.post(environment.baseUrl + 'employee/gettaskcount', data)
      .subscribe((responseData: any) => {
        this.taskStatus = responseData.data;
      });
  };

  getprojectTaskCount(list) {
    let data: any;
    data = { projectList: list, userId: this.userid };
    this.http.post(environment.baseUrl + 'employee/getprojecttaskcount', data)
      .subscribe((responseData: any) => {
        this.teamSummaryChart(responseData.data)
        console.log(responseData);

      });
  };

  teamSummaryChart(data) {
    const elem: HTMLElement | null = document.getElementById('teamSummaryChart');
    const elem2: HTMLElement | null = document.getElementById('teamSummary');
    if (elem) {
      elem.parentElement && elem.parentElement.removeChild(elem);
    }
    let canvas = this.renderer.createElement('canvas');
    this.renderer.setProperty(canvas, 'id', 'teamSummaryChart');
    this.renderer.appendChild(elem2, canvas);
    let labels = [];
    let completed = [];
    let rework = [];
    let progress = [];
    let waiting = [];
    for (let i = 0; i < data.length; i++) {
      labels.push(this.employeeProjectList[i].name);
      completed.push(data[i].data[0].Completed);
      rework.push(data[i].data[0].rework);
      progress.push(data[i].data[0].Progress);
      waiting.push(data[i].data[0].waiting);
    }

    var myChart = new Chart("teamSummaryChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Completed',
          data: completed,
          backgroundColor:
            '#63FD68',
          borderWidth: 0
        },
        {
          label: 'In progress',
          data: progress,
          backgroundColor:
            '#63A6FD',
          borderWidth: 0
        },
        {
          label: 'Waiting',
          data: waiting,
          backgroundColor:
            '#FD63EB',
          borderWidth: 0
        },
        {
          label: 'Rework',
          data: rework,
          backgroundColor:
            '#FD6363',
          borderWidth: 0
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'no of tasks'
            },
            ticks: {
              beginAtZero: true,
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true
        },
      }
    });
  }


}
