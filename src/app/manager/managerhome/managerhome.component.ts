import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-managerhome',
  templateUrl: './managerhome.component.html',
  styleUrls: ['./managerhome.component.css']
})
export class ManagerhomeComponent implements OnInit {
  name: any;
  mail: any;
  userid: any;
  projectId: any;
  managerProjectList: any;
  teamMemberList: any;
  taskList: any;
  approvalList: any;
  myTeam1: any;
  // Doughnut
  public doughnutChartLabels: Label[] = ['Completed', 'pending'];
  public doughnutChartData: MultiDataSet = [
    [350, 450]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  form = new FormGroup({
    TaskDec: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.mail = localStorage.getItem('mail');
    this.userid = localStorage.getItem('id');
    this.getManagerProjrcts();


  }
  // tslint:disable-next-line: typedef
  getManagerProjrcts() {
    let data: any;
    data = { userid: this.userid };
    this.http.post(environment.baseUrl+'manager/getmanagerprojects', data)
      .subscribe((responseData) => {
        this.managerProjectList = responseData;
        const projectid = this.managerProjectList.data[0].id;
        localStorage.setItem('projectid', projectid);
        this.projectId = localStorage.getItem('projectid');
        this.getTeamMembersList(projectid);
        this.getTaskList(projectid);
        this.getApprovalList(projectid);
        this.getTeamMembers();
        this.getTeamselfChartsload(projectid, this.userid)
      });
  }
  getTeamMembersList(prid) {
    let data: any;
    data = { projectid: prid };
    this.http.post(environment.baseUrl+'manager/getTeamMembersList', data)
      .subscribe((responseData) => {
        this.teamMemberList = responseData;
      });
  };
  getTaskList(prid) {
    let data: any;
    data = { projectid: prid };
    this.http.post(environment.baseUrl+'manager/getTaskList', data)
      .subscribe((responseData) => {
        this.taskList = responseData;
      });
  };

  getApprovalList(prid) {
    let data: any;
    data = { projectid: prid };
    this.http.post(environment.baseUrl+'manager/getapprovalList', data)
      .subscribe((responseData: any) => {
        this.approvalList = responseData.data;
      });
  };

  approveTask(taskId) {
    let data: any;
    console.log(taskId);

    data = { taskId: taskId };
    this.http.post(environment.baseUrl+'manager/approvetask', data)
      .subscribe((responseData: any) => {
        this.getApprovalList(this.projectId);
        this.getTaskList(this.projectId);
      });
  };

  rejectTask(taskId, comments) {
    let data: any;
    if (comments != "") {
      console.log(comments);
      data = { taskId: taskId, comments: comments };
      this.http.post(environment.baseUrl+'manager/rejecttask', data)
        .subscribe((responseData: any) => {
          this.getApprovalList(this.projectId);
          this.getTaskList(this.projectId);
        });
    } else {
      console.log("comment null");
    }
  };

  getTeamMembers() {
    let data: any;
    data = { projectId: this.projectId };
    this.http.post(environment.baseUrl+'employee/getteammembersload', data)
      .subscribe((responseData: any) => {
        this.myTeam1 = responseData.data;
      });
  };

  createTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let taskDec = form.value.TaskDec;
    let empid = form.value.employee;
    let data: any;
    data = { taskDec: taskDec, projectid: this.projectId, empid: empid };
    console.log(data);
    this.http.post<{ object }>(environment.baseUrl+'manager/createTask', data)
      .subscribe((responseData) => {
        console.log(responseData);
      });
    console.log(this.taskList);
    this.getTaskList(this.projectId);
    form.reset();
  };

  getTeamselfChartsload(projectId, empId) {
    let data: any;
    data = { projectId: projectId, empId: empId };
    this.http.post(environment.baseUrl+'employee/selfteamchart', data)
      .subscribe((responseData: any) => {
        console.log(responseData);
        this.teamChart(responseData.data);
      })

  };
  teamChart(data) {
    const elem: HTMLElement | null = document.getElementById('teamChart');
    const elem2: HTMLElement | null = document.getElementById('team');
    if (elem) {
      elem.parentElement && elem.parentElement.removeChild(elem);
    }
    let canvas = this.renderer.createElement('canvas');
    this.renderer.setProperty(canvas, 'id', 'teamChart');
    this.renderer.appendChild(elem2, canvas);
    // let compliance = data.data[0].value[0].TEAM_UTILIZATION;
    let completed = data[0].teamCompleted;
    let pending = data[0].teamProgress;
    var myChart = new Chart("teamChart", {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Completed'],
        datasets: [{
          data: [pending, completed],
          backgroundColor: [
            '#FF7867',
            '#28A745'

          ],
          borderWidth: 1
        },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true
        },

      }
    });
  };

}
