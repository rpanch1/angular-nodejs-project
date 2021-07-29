import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users = [];

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this._adminService.getUsers().subscribe((res) => {
      this.users = res.users;
    }, (err) => {
      console.log(err);
    })
  }

  removeUser(userid: any, index: any){
    this._adminService.removeUser(userid).subscribe((res) => {
      this.users.splice(index, 1);
      alert('user has been successfully removed');
    }, (err) => {
      console.log(err)
    })
  }

}
