import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-managersummary',
  templateUrl: './managersummary.component.html',
  styleUrls: ['./managersummary.component.css']
})
export class ManagersummaryComponent implements OnInit {
  name: any;
  mail: any;
  userid: any;
  projectId: any;
  employeeProjectList: any;
  employeeProjectListId = [];
  taskStatus;
  projectSummary = [];
  team;
  teamId = [];

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.mail = localStorage.getItem('mail');
    this.userid = localStorage.getItem('id');
    this.projectId = localStorage.getItem('projectid');
    this.getTaskCount();
    this.getTeamMembers();
  }
  // getEmployeeProjects() {
  //   let data: any;
  //   data = { userid: this.userid };
  //   this.http.post('http://localhost:3000/manager/getemployeeprojects', data)
  //     .subscribe(async (responseData: any) => {
  //       this.employeeProjectList = responseData.data;
  //       for (let i = 0; i < responseData.data.length; i++) {
  //         this.employeeProjectListId.push(responseData.data[i].id)
  //       }
  //      let data = await this.getprojectTaskCount();

  //     });
  // };
  getTeamMembers() {
    let data: any;
    data = { projectId: this.projectId };
    this.http.post(environment.baseUrl + 'manager/getteammembersload', data)
      .subscribe((responseData: any) => {
        this.team = responseData.data;
        for (let i = 0; i < responseData.data.length; i++) {
          this.teamId.push(responseData.data[i].id)
        }
        this.getTeamTaskCount(this.teamId)

      });
  };
  getTaskCount() {
    let data: any;
    data = { projectId: this.projectId };
    this.http.post(environment.baseUrl + 'manager/gettotaltaskcount', data)
      .subscribe((responseData: any) => {
        this.taskStatus = responseData.data;
      });
  };

  getTeamTaskCount(teamId) {
    let data: any;
    data = { teamId: this.teamId, projectId: this.projectId };
    this.http.post(environment.baseUrl + 'manager/getprojecttaskcount', data)
      .subscribe(async (responseData: any) => {
        this.teamSummaryChart(responseData.data)
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
      labels.push(this.team[i].name);
      completed.push(data[i].data[0].Completed);
      rework.push(data[i].data[0].rework);
      progress.push(data[i].data[0].progress);
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
