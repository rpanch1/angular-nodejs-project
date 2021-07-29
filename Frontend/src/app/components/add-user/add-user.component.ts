import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'normal'
  }

  constructor(private _adminService: AdminService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this._adminService.addUser(this.newUser).subscribe((response) => {
      alert(response.message);

    }, (err) => {
      console.log(err.error.message);
    })
  }

}
