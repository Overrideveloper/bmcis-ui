declare var require: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  public patients = [];
  constructor(public router: Router, public http: HttpClient) { }

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

  delete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, this entry cannot be recovered.',
      icon: 'warning',
      buttons: [ true, true ],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        const form = new FormData();
        form.append('id', id);
        this.http.post(`${URL}patient/delete`, form).subscribe((data: any) => {
          if (data.code === 200) {
            this.loadPatients();
            swal('Poof! Patient deleted!', {
              icon: 'success',
            });
          }
        });
      } else {
        swal('Okay!', {
          icon: 'info'
        });
      }
    });
  }
}
