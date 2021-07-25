import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  }

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(){
    this._userService.registerUser(this.newUser).subscribe((response) => {
      alert(response.message);
      this._router.navigate(['login']);
    }, (err) => {
      alert(err.error.message);
    })
  }
}
