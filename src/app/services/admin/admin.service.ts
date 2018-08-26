import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {

  constructor(public toastr: ToastrService) { }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.group !== 'Admin') {
      this.toastr.warning('Access denied!');
      return false;
    }
    return true;
  }
}
