declare var require: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import printJS from 'node_modules/print-js/src/index.js';

const config = require('../../config'),
  URL = config.url;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users = [];
  public init = [];
  public queryArray = [];
  public query = '';
  public p = 1;

  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
    this.loadusers();
  }

  print() {
    const element = document.getElementById('print');
    element.hidden = false;
    printJS({ printable: 'print', type: 'html', header: 'Breast Cancer Detection Suite - Test History'});
    element.hidden = true;
  }

  loadusers() {
    this.http.get(`${URL}user/list`).subscribe((data: any) => {
      if (data.code === 200) {
        this.users = data.data;
        this.init = this.users;
      }
    });
  }

  delete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, this user cannot be recovered.',
      icon: 'warning',
      buttons: [ true, true ],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        const form = new FormData();
        form.append('id', id);
        this.http.post(`${URL}user/delete`, form).subscribe((data: any) => {
          if (data.code === 200) {
            this.loadusers();
            swal('Poof! User deleted!', {
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
      if (v.username && q) {
        if (v.username.toLowerCase().indexOf(q.toLowerCase()) === 0) {
          return true;
        }
        return false;
      }
    });
  }
}
