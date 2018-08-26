declare var require: any;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  public id;
  public groups: Array<any>;
  public genotypes: Array<any> = [];
  public patient = { name: '', age: '', height: '', gender: 'Gender', weight: '', blood_group: 'Blood Group', genotype: 'Genotype' };
  constructor(private route: ActivatedRoute, public http: HttpClient, public router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadPatient(this.id);
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

  loadPatient(id) {
    const form = new FormData();
    form.append('id', id);
    this.http.post(`${URL}patient/read`, form).subscribe((data: any) => {
      if (data.code === 200) {
        this.patient = data.data;
        this.loadGenotypes(data.data['blood_group']);
      }
    });
  }

  submit() {
    const form = new FormData, patient = Object.keys(this.patient);
    form.append('id', this.id);
    let len = Object.keys(this.patient).length;

    patient.forEach(element => {
      form.append(element, this.patient[element]);
      len -= 1;

      if (len === 0) {
        this.http.post(`${URL}patient/update`, form).subscribe((data: any) => {
          if (data.code === 200) {
            this.toastr.info('Patient edited!', 'BCDS');
            this.router.navigate(['patient/list']);
          } else {
            this.toastr.error(data.data, 'BCDS');
          }
        });
      }
    });
  }
}
