declare var require: any;
import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date/date.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-patient-results',
  templateUrl: './patient-results.component.html',
  styleUrls: ['./patient-results.component.css']
})
export class PatientResultsComponent implements OnInit {
  public results = [];
  public patient_id;
  public name;

  constructor(public route: ActivatedRoute, public http: HttpClient, public date: DateService, public toastr: ToastrService) { }

  ngOnInit() {
    this.patient_id = this.route.snapshot.paramMap.get('patient_id');
    this.loadPatient().then(() => {
      this.loadResults();
    });
  }

  loadPatient() {
    const promise = new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('id', this.patient_id);
      this.http.post(`${URL}patient/read`, form).subscribe((data: any) => {
        if (data.code === 200) {
          this.name = data.data.name;
          resolve();
        }
      }, error => {
        reject();
      });
    });
    return promise;
  }

  loadResults() {
    const form = new FormData();
    form.append('patient_id', this.patient_id);
    this.http.post(`${URL}test/read_by_patient`, form).subscribe((data: any) => {
      if (data.code === 200) {
        if (data.data.length !== 0) {
          this.results = data.data;
        } else {
          this.results = [];
          this.toastr.info('No tests run for this patient', 'BCDS');
        }
      }
    });
  }

}
