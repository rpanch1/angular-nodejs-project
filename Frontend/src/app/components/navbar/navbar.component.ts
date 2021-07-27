import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminGuardService } from 'src/app/services/admin-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private _router: Router, private _adminAuth: AdminGuardService ) { }


  ngOnInit(): void {
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token') != null){
      return true;
    }
    else{
      return false;
    }
  }

  isAdmin(): any{
    if(localStorage.getItem('token').split(' ')[1] == 'admin'){
      return true;
    }
    else{
      return false;
    }
  }

}
