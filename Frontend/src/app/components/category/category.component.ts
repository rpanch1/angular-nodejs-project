import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products = []
  filteredProducts = [];
  cart = [];

  category = {
    men: true,
    women: true,
    electronics: true
  }

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this._userService.getProducts().subscribe((res) => {
      this.products = res;
      this.filteredProducts = JSON.parse(JSON.stringify(this.products));

    }, (err) => (console.log(err)));

    if(this.isLoggedIn()){
      this._userService.getProfile().subscribe((res) => {
        this.cart = res.profile.cart;
      }, (err) => (console.log(err)));
    }
  }

  addToCart(product: any) {
    this.cart.push(product);
    this._userService.updateProfile({cart: this.cart}).subscribe((res) => {
      alert('product added to cart');
    }, (err) => {console.log(err)})
  }

  productDetails(id: any){
    this._router.navigate(['/product-details', id]);
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token') != null){
      return true;
    }
    else{
      return false;
    }
  }

  women(){
    this.category.women = !this.category.women;
    this.filterProducts();
  }

  men(){
    this.category.men = !this.category.men;
    this.filterProducts();
  }

  electronics(){
    this.category.electronics = !this.category.electronics;
    this.filterProducts();
  }

  filterProducts(){
    if(this.category.women && this.category.men && this.category.electronics){
      this.filteredProducts = JSON.parse(JSON.stringify(this.products));
    }
    else if(this.category.women && this.category.men && !this.category.electronics){
      this.filteredProducts = this.products.filter((product) => (product.category == 'Women' || product.category == 'Men'));
    }
    else if(this.category.women && !this.category.men && this.category.electronics){
      this.filteredProducts = this.products.filter((product) => (product.category == 'Women' || product.category == 'Electronics'));
    }
    else if(!this.category.women && this.category.men && this.category.electronics){
      this.filteredProducts = this.products.filter((product) => (product.category == 'Men' || product.category == 'Electronics'));
    }
    else if(this.category.women && !this.category.men && !this.category.electronics){
      this.filteredProducts = this.products.filter((product) => (product.category == 'Women'));
    }
    else if(!this.category.women && !this.category.men && this.category.electronics){
      this.filteredProducts = this.products.filter((product) => (product.category == 'Electronics'));
    }
    else if(!this.category.women && this.category.men && !this.category.electronics){
      this.filteredProducts = this.products.filter((product) => (product.category == 'Men'));
    }
    else{
      this.filteredProducts = this.products.filter((product) => (product.category == ''));
    }
  }

}
