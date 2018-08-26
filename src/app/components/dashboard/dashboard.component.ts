declare var require: any;
import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date/date.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public day;
  public date;
  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public dayOfWeek;
  public user = {};
  public users;
  public patients;
  constructor(public dateService: DateService, public router: Router, public http: HttpClient) { }

  ngOnInit() {
    this.loadDate();
    this.loadUser();
    this.statistics();
  }

  loadDate() {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    this.day = this.days[date.getDay()];
    this.date = this.dateService.convertToDate(timestamp / 1000);
    this.dayOfWeek = this.dateService.getTimeOfDay(timestamp / 1000);
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logOut() {
    this.router.navigate(['login']);
    localStorage.clear();
  }

  statistics() {
    this.http.get(`${URL}user/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.users = data.data.length;
      }
    });

    this.http.get(`${URL}patient/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.patients = data.data.length;
      }
    });
  }
}
