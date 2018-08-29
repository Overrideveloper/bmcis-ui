declare var require: any;
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  public image;
  public URL;
  public file;

  constructor(public http: HttpClient, public router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    this.URL = URL;
    this.loadPatients();
  }

  loadPatients() {
    this.http.get(`${URL}patient/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.patients = data.data;
      }
    });
  }

  onFileChange(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (!files[0]) {
      return;
    } else {
      this.file = files[0];
      const image = new FormData();
      image.append('image', files[0]);

      this.http.post(`${URL}upload`, image).subscribe((data: any) => {
        if (data.code === 200) {
          this.image = data.filename;
        }
      });
    }
  }

  submit() {
    const form = new FormData();
    form.append('image', this.file);
    form.append('img', this.image);
    form.append('patient_id', this.patient_id);
    form.append('timestamp', `${Date.now()}`);

    this.http.post(`${URL}test/run`, form).subscribe((data: any) => {
      if (data.code === 200) {
        this.router.navigate([`/diagnosis/result/${data.data.id}`]);
        this.toastr.success('Diagnosis Complete!', 'BCDS');
      }
    });
  }
}
