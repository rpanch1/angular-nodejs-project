import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: {
    _id: '',
    name: '',
    category: '',
    description: '',
    price: 0,
    discountPrice: 0,
    image: ''
  };
  allProducts = [];
  recProducts = [];
  cart = [];

  loadingDone: Boolean = false;

  constructor(private _userService: UserService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    var id;
    this.route.params.subscribe(params => {
      id = params['id'];
      this._userService.getProductDetails(id).subscribe((res) => {
        this.product = res;
        this._userService.getProducts().subscribe((res) => {
          this.allProducts = res;
          this.setRecProducts(this.allProducts);
          this.loadingDone = true;
        })
      }, (err) => (console.log(err)))
      this._userService.getProfile().subscribe((res) => {
        // console.log(res.profile.cart);
        this.cart = res.profile.cart;
      })
      // Work around to make sure user starts at the top of the page
      window.scrollTo(0,0);
    });
   
  }

  setRecProducts(productList) {
    this.recProducts = productList.filter((x) => {
      return ((x.category == this.product.category) && (x._id != this.product._id));
    });
    if (this.recProducts.length == 0) {
      while (this.recProducts.length < 4 && this.allProducts.length > 0) {
        let prod = this.allProducts.pop();
        if (prod._id != this.product._id) {
          this.recProducts.push(prod);
        }
      }
      // this.recProducts = this.allProducts.slice(0, 4);
    } else if (this.recProducts.length > 4) {
      this.recProducts = this.recProducts.slice(0,4);
    }
  }

  addToCart(product: any) {
    this.cart.push(product);
    this._userService.updateProfile({ cart: this.cart }).subscribe((res) => {
      alert('product added to cart');
    }, (err) => { console.log(err) })
  }

  productDetails(id: any) {
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

}
