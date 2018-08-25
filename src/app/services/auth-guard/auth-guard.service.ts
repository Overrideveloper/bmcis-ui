import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public toastr: ToastrService) { }

  canActivate() {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    if (user_data === null || user_data === undefined) {
      localStorage.clear();
      this.router.navigate(['login']);
      this.toastr.warning('You need to login!');
      return false;
    }
    return true;
  }
}
