import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // Bool to show edit address form 
  showEdit: Boolean = false;

  // User obj to get the user info to display from
  user = {
    "firstname": "Testy",
    "lastname": "McTester",
    "email": "Test@email.com",
    "phone": "12345",
    "address": "address of mine",
    "interests": "all the interesting things",
    "image": "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
  }

  // Used for the edit address form. Later compiled into a single address string
  newAddress = {
    "street": "",
    "city": "",
    "state": "",
    "zip": "",
  }

  constructor() { }

  ngOnInit(): void {
  }

  // Boolean func to switch address edit mode.
  isEdit() {
    if (this.showEdit) {
      this.showEdit = false;
    } else {
      this.showEdit = true;
    }
  }

  // Called  when done with edit address function
  saveAddress() {
    this.isEdit();
    // Actually save the changes here
    let addrString = this.newAddress.street + ", " + this.newAddress.city + ", " + this.newAddress.state + " " + this.newAddress.zip;
    //   console.log(addrString);  
  }

}
