declare var require: any;
import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date/date.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import printJS from 'node_modules/print-js/src/index.js';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public result;
  public patient;
  public id;
  public URL;
  public datetime;
  constructor(public route: ActivatedRoute, public http: HttpClient, public date: DateService) { }

  ngOnInit() {
    this.URL = URL;
    this.id = this.route.snapshot.paramMap.get('test_id');
    this.loadReport();
    const timestamp = Date.now();
    this.datetime = this.date.convertToDateOnly(timestamp / 1000);
  }

  print() {
    const element = document.getElementById('print');
    element.hidden = false;
    printJS({ printable: 'print', type: 'html', header: `Breast Cancer Detection Suite - ${this.patient.name}'s Test Result`});
    element.hidden = true;
  }

  loadReport() {
    const form = new FormData();
    form.append('id', this.id);

    this.http.post(`${URL}test/read`, form).subscribe((data: any) => {
      if (data.code === 200) {
        const result = data.data;
        const query = new FormData();
        query.append('id', result.patient_id);
        // tslint:disable-next-line
        this.http.post(`${URL}patient/read`, query).subscribe((data: any) => {
          if (data.code === 200) {
            this.patient = data.data;
            this.result = result;
          }
        });
      }
    });
  }

  convertToPercentage(float) {
    console.log(float);
    const _float = float * 100;
    return _float.toFixed(2);
  }
}
