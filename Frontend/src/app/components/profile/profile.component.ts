import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // Bool to show edit address form 
  showAddressEdit: Boolean = false;
  editFields: Boolean = false;

  // User obj to get the user info to display from
  user;
  // Boolean to make sure that html doesn't try to render until data is recieved from db
  loadingData; false;

  // Used for the edit address form. Later compiled into a single address string
  newAddress = {
    "street": "",
    "city": "",
    "state": "",
    "zip": "",
  }

  constructor(private _userService: UserService) {

    
  }

  ngOnInit(): void {
    // Get the User profile of the logged in user from mongo
    this._userService.getProfile().subscribe((result) => {
      this.user = result.profile;
      console.log(this.user);
      // Make sure that there is a default image.
      if (this.user.image == "") {
        this.user.image = "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg";
      }
      this.loadingData = true;
    });
  }

  // Boolean func to switch address edit mode.
  isAddressEdit() {
    if (this.showAddressEdit) {
      this.showAddressEdit = false;
    } else {
      this.showAddressEdit = true;
    }
  }

  // Called  when done with edit address function
  saveAddress() {
    this.isAddressEdit();
    // Actually save the changes here
    let addressString = this.newAddress.street + ", " + this.newAddress.city + ", " + this.newAddress.state + " " + this.newAddress.zip;
    this.user.address = addressString;
    this._userService.updateProfile(this.user).subscribe((response) => {
      console.log(response.message);
    });
  }

  // Upload image for user
  // NOTE: this is not a required function for this project as stated by Instructor in QnA on 7/27
  uploadImage() {
    console.log("updating user image");
    // How to implement this? just ask for a string?
  }

  // Delete image for user and instate default
  // Since the image cannot be changed this doesn't need to be implemented as of yet.
  deleteImage() {
    this.user.image = "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg";
    // Save updated user 
    console.log("Deleted user image and returned to default")
  }

}
