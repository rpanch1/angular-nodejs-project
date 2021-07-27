import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  // User obj to get the user info to display from
  user;
  // Boolean to make sure that html doesn't try to render until data is recieved from db
  loadingData; false;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    // Get the User profile of the logged in user from mongo
    this._userService.getProfile().subscribe((result) => {
      this.user = result.profile;
      console.log(this.user);
      this.loadingData = true;
    });
  }

  // Save the updated profile info to mongo
  saveProfile() {
    console.log("Updating user");
    // user service to update the user info.
    this._userService.updateProfile(this.user).subscribe((response) => {
      console.log(response.message);
      this._router.navigate(['/profile']);
    });
  }

}
