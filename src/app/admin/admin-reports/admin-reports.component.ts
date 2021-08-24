import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {
  name;
  projectList;
  projectListId = [];
  team;
  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.getProjects();
    this.getProjectWisetaskCount()
  }

  getProjects() {
    this.http.get(environment.baseUrl + 'admin/getProjects')
      .subscribe((responseData: any) => {
        this.projectList = responseData.data;
        for (let i = 0; i < responseData.data.length; i++) {
          this.projectListId.push(responseData.data[i].id)
        }
        this.getProjectWisetaskCount();
        this.getTeamMembers(responseData.data[0].id)
      });
  }

  getProjectWisetaskCount() {
    let data = { projectIdList: this.projectListId };
    this.http.post(environment.baseUrl + 'admin/getprojecttaskcount', data)
      .subscribe((responseData: any) => {
        this.teamSummaryChart(responseData.data)

      });
  }

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
    let pending = [];
    for (let i = 0; i < data.length; i++) {
      labels.push(this.projectList[i].name);
      completed.push(data[i].data[0].Completed);
      pending.push(data[i].data[0].pending);
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
          data: pending,
          backgroundColor:
            '#63A6FD',
          borderWidth: 0
        },
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
  getProjectTasks(id) {
    this.getTeamMembers(id);

  }
  getTeamMembers(id) {
    let data: any;
    data = { projectId: id };
    this.http.post(environment.baseUrl + 'manager/getteammembersload', data)
      .subscribe((responseData: any) => {
        this.team = responseData.data;
        let teamId = [];
        for (let i = 0; i < responseData.data.length; i++) {
          teamId.push(responseData.data[i].id)
        }
        this.getTeamTaskCount(teamId, id)

      });
  };

  getTeamTaskCount(teamId, id) {
    let data: any;
    data = { teamId: teamId, projectId: id };
    this.http.post(environment.baseUrl + 'manager/getprojecttaskcount', data)
      .subscribe(async (responseData: any) => {

        this.teamSummaryChart2(responseData.data)
      });
  };
  teamSummaryChart2(data) {

    const elem: HTMLElement | null = document.getElementById('teamSummaryChart2');
    const elem2: HTMLElement | null = document.getElementById('teamSummary2');
    if (elem) {
      elem.parentElement && elem.parentElement.removeChild(elem);
    }
    let canvas = this.renderer.createElement('canvas');
    this.renderer.setProperty(canvas, 'id', 'teamSummaryChart2');
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

    var myChart = new Chart("teamSummaryChart2", {
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
