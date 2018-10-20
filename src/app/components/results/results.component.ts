declare var require: any;
import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date/date.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import printJS from 'node_modules/print-js/src/index.js';

import { select } from '@angular-redux/store';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @select() results;
  @select() positiveResults;
  @select() negativeResults;

  public init = [];
  public queryArray = [];
  public type = '';
  public query = '';
  public p = 1;
  constructor(public router: Router, public http: HttpClient, public date: DateService) { }

  ngOnInit() {
    this.loadResults();
  }

  print() {
    const element = document.getElementById('print');
    element.hidden = false;
    printJS({ printable: 'print', type: 'html', header: 'Breast Cancer Detection Suite - Test History'});
    element.hidden = true;
  }

  loadResults() {
    this.type = 'all';
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
              const patient = data.data['name'], date = this.date.convertToDate(element.timestamp / 1000),
                result = element.result, id = element.id;
              const itr = { patient, date, result, id };
              results.push(itr);
              len -= 1;
              if (len === 0) {
                this.init = results;
              }
            }
          });
        });
      }
    });
  }

  loadPositive() {
    this.type = 'pos';
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
              const patient = data.data['name'], date = this.date.convertToDate(element.timestamp / 1000),
                result = element.result, id = element.id;
              const itr = { patient, date, result, id };
              results.push(itr);
              len -= 1;
              if (len === 0) {
                this.init = results;
              }
            }
          });
        });
      }
    });
  }

  loadNegative() {
    this.type = 'neg';
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
              const patient = data.data['name'], date = this.date.convertToDate(element.timestamp / 1000),
                result = element.result, id = element.id;
              const itr = { patient, date, result, id };
              results.push(itr);
              len -= 1;
              if (len === 0) {
                this.init = results;
              }
            }
          });
        });
      }
    });
  }

  initializeItems(items) {
    this.init = items;
  }

  filter(searchbar) {
    this.initializeItems(this.init);

    const q = searchbar.srcElement.value;

    if (!q) {
      return;
    }

    this.queryArray = this.init.filter((v) => {
      if (v.patient && q) {
        if (v.patient.toLowerCase().indexOf(q.toLowerCase()) === 0) {
          return true;
        }
        return false;
      }
    });
  }
}
