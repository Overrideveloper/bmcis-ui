declare var require: any;
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

const config = require('../../config');
const URL = config.url;

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {
  public auth = { username: '', hash: '', group: 'Admin' };
  public userLength: any;
  constructor(public router: Router, public toastr: ToastrService, public http: HttpClient) { }

  reset() {
    this.auth = { username: '', hash: '', group: 'Admin' };
  }

  submit() {
    const form = new FormData();
    form.append('username', this.auth.username);
    form.append('hash', this.auth.hash);
    form.append('group', this.auth.group);

    this.http.post(`${URL}user/signup`, form).subscribe((data: any) => {
      if (data.code === 200) {
        this.reset();
        this.router.navigate(['login']);
        this.toastr.info('Setup successful!', 'BCDS');
      }
    });
  }
}
