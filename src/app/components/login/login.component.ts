declare var require: any;
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

const config = require('../../config');
const URL = config.url;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public auth = { username: '', hash: '' };
  public userLength: any;
  constructor(public router: Router, public toastr: ToastrService, public http: HttpClient) { }

  ngOnInit() {
    this.userCount();
  }

  reset() {
    this.auth = { username: '', hash: '' };
  }

  submit() {
    const form = new FormData();
    form.append('username', this.auth.username);
    form.append('hash', this.auth.hash);

    this.http.post(`${URL}user/login`, form).subscribe((data: any) => {
      if (data.code === 200) {
        this.reset();
        const user = { username: data.data[0].username, group: data.data[0].group };
        localStorage.setItem('user', JSON.stringify(user));
        this.toastr.info('Login successful!', 'BCDS');
        this.router.navigate(['dashboard']);
      }
    });
  }

  userCount() {
    this.http.get(`${URL}user/list`).subscribe((data: any) => {
      console.log(data);
      if (data.code === 200) {
        this.userLength = data.data.length;
      }
    });
  }
}
