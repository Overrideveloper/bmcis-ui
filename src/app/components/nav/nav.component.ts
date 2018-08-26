import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public user = {};

  constructor(public router: Router) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logOut() {
    this.router.navigate(['login']);
    localStorage.clear();
  }
}
