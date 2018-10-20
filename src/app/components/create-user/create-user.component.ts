declare var require: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { ADD_USER } from '../../actions/user';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public groups: Array<any>;
  public user = { username: '', hash: '', group: 'Group' };
  constructor(public router: Router, public http: HttpClient, public toastr: ToastrService, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.groups = [ 'Admin', 'Doctor', 'Nurse', 'Lab Assistant' ];
  }

  submit() {
    const form = new FormData, user = Object.keys(this.user);
    let len = Object.keys(this.user).length;

    user.forEach(element => {
      form.append(element, this.user[element]);
      len -= 1;

      if (len === 0) {
        this.http.post(`${URL}user/signup`, form).subscribe((data: any) => {
          console.log(data);
          if (data.code === 200) {
            this.ngRedux.dispatch({ type: ADD_USER, user: data.data});
            this.toastr.info('user added!', 'BCDS');
            this.router.navigate(['user/list']);
          } else {
            this.toastr.error(data.data, 'BCDS');
          }
        });
      }
    });
  }
}
