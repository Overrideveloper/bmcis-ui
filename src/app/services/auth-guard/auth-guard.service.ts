import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public toastr: ToastrService) { }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null || user === undefined) {
      localStorage.clear();
      this.router.navigate(['login']);
      this.toastr.warning('You need to login!');
      return false;
    }
    return true;
  }
}
