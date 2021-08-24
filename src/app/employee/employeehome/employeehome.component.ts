import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.css']
})
export class EmployeehomeComponent implements OnInit {
  not = false;
  name: any;
  mail: any;
  userid: any;
  projectId: any;
  employeeProjectList: any;
  projectDetails: any;
  taskList: any;
  notificationList: any;
  projectManager: any;
  myTeam1: any;
  myTeam2: any;

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.mail = localStorage.getItem('mail');
    this.userid = localStorage.getItem('id');
    this.getEmployeeProjects();
  }
  getEmployeeProjects() {
    let data: any;
    data = { userid: this.userid };
    this.http.post(environment.baseUrl + 'employee/getemployeeprojects', data)
      .subscribe((responseData: any) => {
        this.employeeProjectList = responseData.data;
        this.getEmployeeSelectedProjectLoad(this.employeeProjectList[0].id);
        this.getTeamMembersLoad(this.employeeProjectList[0].id)
        this.getEmployeeTasksLoad(this.employeeProjectList[0].id);
        this.getEmployeeNotificationLoad(this.employeeProjectList[0].id)
        this.getTeamselfChartsload(this.employeeProjectList[0].id, this.userid)
      });
  };

  //fetching particular project details that seleted from dropdown on load
  getEmployeeSelectedProjectLoad(projectId) {
    let data: any;
    data = { projectId: projectId };
    this.http.post(+environment.baseUrl+'employee/getemployeeselectedprojectload', data)
      .subscribe((responseData: any) => {
        this.projectDetails = responseData.data;
        this.getProjectManagerLoad(this.projectDetails[0].project_manager)
      });
  };

  // get manager name for particular project on load
  getProjectManagerLoad(managerId) {
    let data: any;
    data = { managerId: managerId };
    this.http.post(environment.baseUrl + 'employee/getmanagerload', data)
      .subscribe((responseData: any) => {
        this.projectManager = responseData.data[0].name;
      });
  };

  // get manager name for particular project
  getProjectManager(managerId) {
    let data: any;
    data = { managerId: managerId };
    this.http.post(environment.baseUrl + 'employee/getmanagerload', data)
      .subscribe((responseData: any) => {
        this.projectManager = responseData.data[0].name;
      });
  };


  //fetching particular project details that seleted from dropdown 
  getEmployeeSelectedProject(projectId) {
    let data: any;
    data = { projectId: projectId };
    this.http.post(environment.baseUrl + 'employee/getemployeeselectedprojectload', data)
      .subscribe((responseData: any) => {
        this.projectDetails = responseData.data;
        this.getProjectManager(responseData.data[0].project_manager)
      });
    this.getEmployeeTasks(projectId);
    this.getEmployeeNotification(projectId);
    this.getTeamMembers(projectId);
    this.getTeamselfChartsload(projectId, this.userid);

  };

  //fetch employee tasks for particular project onload
  getEmployeeTasksLoad(projectId) {
    this.projectId = projectId;
    let data: any;
    data = { projectId: projectId, userId: this.userid };
    this.http.post(environment.baseUrl + 'employee/getemployeesetasksload', data)
      .subscribe((responseData: any) => {
        this.taskList = responseData.data;
      });
  };

  //fetch employee tasks for particular project
  getEmployeeTasks(projectId) {
    this.projectId = projectId;
    let data: any;
    data = { projectId: projectId, userId: this.userid };
    this.http.post(environment.baseUrl + 'employee/getemployeesetasksload', data)
      .subscribe((responseData: any) => {
        if (responseData.status == "E") {
          this.taskList = null
        } else {
          this.taskList = responseData.data;
        }
      })
  };
  //fetch employee tasks for particular project on load
  getEmployeeNotificationLoad(projectId) {
    this.projectId = projectId;
    let data: any;
    data = { projectId: projectId, userId: this.userid };
    this.http.post(environment.baseUrl + 'employee/getemployeenotificationload', data)
      .subscribe((responseData: any) => {
        if (responseData.status == "S") {
          this.notificationList = responseData.data
          this.not = false;
        }
        else {
          this.notificationList = null;
          this.not = true
        }
      });
  };

  //fetch employee tasks for particular project
  getEmployeeNotification(projectId) {
    this.projectId = projectId;
    let data: any;
    data = { projectId: projectId, userId: this.userid };
    this.http.post(environment.baseUrl + 'employee/getemployeenotificationload', data)
      .subscribe((responseData: any) => {
        if (responseData.status == "S") {
          this.notificationList = responseData.data;
          this.not = false
        }
        else {
          this.notificationList = null;
          this.not = true;
        }
      });
  };

  //fetch employee tasks for particular project onload
  getTeamMembersLoad(projectId) {
    this.projectId = projectId;
    let data: any;
    data = { projectId: projectId };
    this.http.post(environment.baseUrl + 'employee/getteammembersload', data)
      .subscribe((responseData: any) => {
        this.myTeam1 = responseData.data;
      });
  };

  getTeamMembers(projectId) {
    this.projectId = projectId;
    let data: any;
    data = { projectId: projectId };
    this.http.post(environment.baseUrl + 'employee/getteammembersload', data)
      .subscribe((responseData: any) => {
        this.myTeam1 = responseData.data;
      });
  };
  //updating status of the task (percentage)
  updateStatus(taskId, percentage) {
    let data: any;
    data = { taskId: taskId, percentage: percentage };
    this.http.post(environment.baseUrl + 'employee/updateTaskStatus', data)
      .subscribe((responseData: any) => {
        this.getEmployeeTasks(this.projectId);
        this.getEmployeeNotification(this.projectId)
      })

  };
  // submiting task for approval
  submitTask(taskId) {
    let data: any;
    data = { taskId: taskId };
    this.http.post(environment.baseUrl + 'employee/submittask', data)
      .subscribe((responseData: any) => {
        this.getEmployeeTasks(this.projectId);
        this.getEmployeeNotification(this.projectId)
      })
  };

  notNowTask(taskId) {
    let data: any;
    data = { taskId: taskId };
    this.http.post(environment.baseUrl + 'employee/notnowtask', data)
      .subscribe((responseData: any) => {
        this.getEmployeeTasks(this.projectId);
        this.getEmployeeNotification(this.projectId)
      })
  };

  getTeamselfChartsload(projectId, empId) {
    let data: any;
    data = { projectId: projectId, empId: empId };
    this.http.post(environment.baseUrl + 'employee/selfteamchart', data)
      .subscribe((responseData: any) => {
        this.teamChart(responseData.data);
        this.selfChart(responseData.data);
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
  selfChart(data) {
    const elem: HTMLElement | null = document.getElementById('selfChart');
    const elem2: HTMLElement | null = document.getElementById('self');
    if (elem) {
      elem.parentElement && elem.parentElement.removeChild(elem);
    }
    let canvas = this.renderer.createElement('canvas');
    this.renderer.setProperty(canvas, 'id', 'selfChart');
    this.renderer.appendChild(elem2, canvas);
    // let compliance = data.data[0].value[0].TEAM_UTILIZATION;
    let completed = data[0].selCompleted;
    let pending = data[0].selfProgress;
    var myChart = new Chart("selfChart", {
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
  }
}
