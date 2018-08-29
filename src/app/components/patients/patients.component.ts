declare var require: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import printJS from 'node_modules/print-js/src/index.js';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  public patients = [];
  public init = [];
  public queryArray = [];
  public query = '';
  public p = 1;
  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.http.get(`${URL}patient/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.patients = data.data;
        this.init = this.patients;
      }
    });
  }

  print() {
    const element = document.getElementById('print');
    element.hidden = false;
    printJS({ printable: 'print', type: 'html', header: 'Breast Cancer Detection Suite - Patients'});
    element.hidden = true;
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
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) === 0) {
          return true;
        }
        return false;
      }
    });
  }
}
