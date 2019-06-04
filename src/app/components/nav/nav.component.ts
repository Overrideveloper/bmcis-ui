import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public user;

  constructor(public router: Router) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logOut() {
    swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: [ true, true ],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        this.router.navigate(['login']);
        localStorage.clear();
      } else {
        swal('Okay!', {
          icon: 'info'
        });
      }
    });
  }
}
