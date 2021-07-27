import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  onSubmit(){
    this._userService.loginUser(this.user).subscribe((response) => {

      this._userService.getUserRole(response.accessToken).subscribe((res) => {
        localStorage.setItem('token', response.accessToken + ' ' + res.profile.role);
        this._router.navigate(['home']);

      }, (error) => console.log(error));

    }, (err) => {
      alert(err.error.message);
    })
  }
}
