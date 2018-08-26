import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date/date.service';
import { Router } from '@angular/router';

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
  constructor(public dateService: DateService, public router: Router) { }

  ngOnInit() {
    this.loadDate();
    this.loadUser();
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
}
