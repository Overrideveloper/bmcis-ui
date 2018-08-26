declare var require: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  public groups: Array<any>;
  public genotypes: Array<any> = [];
  public patient = { name: '', age: '', height: '', gender: 'Gender', weight: '', blood_group: 'Blood Group', genotype: 'Genotype' };
  constructor(public router: Router, public http: HttpClient, public toastr: ToastrService) { }

  ngOnInit() {
    this.groups = [ 'A', 'B', 'AB', 'O' ];
  }

  loadGenotypes(group) {
    switch (group) {
      case 'A':
        this.genotypes = [ 'AA', 'AO' ];
        break;

      case 'B':
        this.genotypes = [ 'BB', 'BO' ];
        break;

      case 'AB':
        this.genotypes = [ 'AB' ];
        break;


      case 'O':
        this.genotypes = [ 'OO' ];
        break;

      default:
        break;
    }
  }

  submit() {
    const form = new FormData, patient = Object.keys(this.patient);
    let len = Object.keys(this.patient).length;

    patient.forEach(element => {
      form.append(element, this.patient[element]);
      len -= 1;

      if (len === 0) {
        this.http.post(`${URL}patient/create`, form).subscribe((data: any) => {
          if (data.code === 200) {
            this.toastr.info('Patient added!', 'BCDS');
            this.router.navigate(['patient/list']);
          } else {
            this.toastr.error(data.data, 'BCDS');
          }
        });
      }
    });
  }
}
