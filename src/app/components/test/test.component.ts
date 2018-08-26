declare var require: any;
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public patients = [];
  public patient_id = '-- Select a patient --';
  public patient;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.http.get(`${URL}patient/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.patients = data.data;
      }
    });
  }
}
