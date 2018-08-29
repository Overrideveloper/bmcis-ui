declare var require: any;
import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date/date.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  constructor(public route: ActivatedRoute, public http: HttpClient, public date: DateService) { }

  ngOnInit() {
    this.URL = URL;
    this.id = this.route.snapshot.paramMap.get('test_id');
    this.loadReport();
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
}
