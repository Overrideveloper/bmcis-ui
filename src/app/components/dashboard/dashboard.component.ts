declare var require: any;
import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date/date.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { LOAD_USERS } from '../../actions/user';
import { LOAD_USER_COUNT } from '../../actions/user';
import { LOAD_PATIENTS, LOAD_PATIENT_COUNT } from 'src/app/actions/patient';
import { LOAD_RESULTS, LOAD_TEST_COUNT, LOAD_POSITIVE_COUNT, LOAD_NEGATIVE_COUNT,
  LOAD_NEGATIVE_RESULTS, LOAD_POSITIVE_RESULTS } from 'src/app/actions/result';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @select() userCount;
  @select() patientCount;
  @select() testCount;
  @select() negativeCount;
  @select() positiveCount;
  public day;
  public date;
  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public dayOfWeek;
  public patients;
  public tests;
  public positives;
  public negatives;
  constructor(public dateService: DateService, public router: Router, public http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    setInterval(() => {
      this.loadDate();
    }, 30000);
    this.loadDate();
    this.statistics();
  }

  loadDate() {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    this.day = this.days[date.getDay()];
    this.date = this.dateService.convertToDate(timestamp / 1000);
    this.dayOfWeek = this.dateService.getTimeOfDay(timestamp / 1000);
  }

  logOut() {
    this.router.navigate(['login']);
    localStorage.clear();
  }

  loadResults() {
    this.http.get(`${URL}test/list`).subscribe((data: any) => {
      if (data.code === 200 && data.data.length !== 0) {
        const raw = data.data, results = [];
        let len = raw.length;
        raw.forEach(element => {
          const form = new FormData();
          form.append('id', element.patient_id);
          // tslint:disable-next-line
          this.http.post(`${URL}patient/read`, form).subscribe((data: any) => {
            if (data.code === 200) {
              const patient = data.data['name'], date = this.dateService.convertToDate(element.timestamp / 1000),
                result = element.result, id = element.id;
              const itr = { patient, date, result, id };
              results.push(itr);
              len -= 1;
              if (len === 0) {
                this.ngRedux.dispatch({ type: LOAD_RESULTS, results: results });
              }
            }
          });
        });
      }
    });
  }

  loadPositiveResults() {
    this.http.get(`${URL}test/positive`).subscribe((data: any) => {
      if (data.code === 200 && data.data.length !== 0) {
        const raw = data.data, results = [];
        let len = raw.length;
        raw.forEach(element => {
          const form = new FormData();
          form.append('id', element.patient_id);
          // tslint:disable-next-line
          this.http.post(`${URL}patient/read`, form).subscribe((data: any) => {
            if (data.code === 200) {
              const patient = data.data['name'], date = this.dateService.convertToDate(element.timestamp / 1000),
                result = element.result, id = element.id;
              const itr = { patient, date, result, id };
              results.push(itr);
              len -= 1;
              if (len === 0) {
                this.ngRedux.dispatch({ type: LOAD_POSITIVE_RESULTS, results: results });
              }
            }
          });
        });
      }
    });
  }

  loadNegativeResults() {
    this.http.get(`${URL}test/negative`).subscribe((data: any) => {
      if (data.code === 200 && data.data.length !== 0) {
        const raw = data.data, results = [];
        let len = raw.length;
        raw.forEach(element => {
          const form = new FormData();
          form.append('id', element.patient_id);
          // tslint:disable-next-line
          this.http.post(`${URL}patient/read`, form).subscribe((data: any) => {
            if (data.code === 200) {
              const patient = data.data['name'], date = this.dateService.convertToDate(element.timestamp / 1000),
                result = element.result, id = element.id;
              const itr = { patient, date, result, id };
              results.push(itr);
              len -= 1;
              if (len === 0) {
                this.ngRedux.dispatch({ type: LOAD_NEGATIVE_RESULTS, results: results });
              }
            }
          });
        });
      }
    });
  }

  statistics() {
    this.loadResults();
    this.loadPositiveResults();
    this.loadNegativeResults();

    this.http.get(`${URL}user/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.ngRedux.dispatch({ type: LOAD_USERS, users: data.data });
        this.ngRedux.dispatch({ type: LOAD_USER_COUNT, userCount: data.data.length });
      }
    });

    this.http.get(`${URL}patient/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.ngRedux.dispatch({ type: LOAD_PATIENTS, patients: data.data });
        this.ngRedux.dispatch({ type: LOAD_PATIENT_COUNT, patientCount: data.data.length });
      }
    });

    this.http.get(`${URL}test/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.ngRedux.dispatch({ type: LOAD_TEST_COUNT, testCount: data.data.length });
      }
    });

    this.http.get(`${URL}test/positive`).subscribe((data: any) => {
      if (data.code === 200) {
        this.ngRedux.dispatch({ type: LOAD_POSITIVE_COUNT, positiveCount: data.data.length });
      }
    });

    this.http.get(`${URL}test/negative`).subscribe((data: any) => {
      if (data.code === 200) {
        this.ngRedux.dispatch({ type: LOAD_NEGATIVE_COUNT, negativeCount: data.data.length });
      }
    });
  }

  convertToPercentage(float) {
    const _float = float * 100;
    return _float.toFixed(2);
  }
}
