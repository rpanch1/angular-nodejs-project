import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MustMatchDirective } from './directives/must-match.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminService } from './services/admin.service';
import { AdminGuardService } from './services/admin-guard.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MustMatchDirective,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    NavbarComponent,
    ProfileComponent,
    ProfileEditComponent,
    AddProductComponent,
    CheckoutComponent,
    CartComponent,
    ManageOrderComponent,
    OrdersComponent,
    ManageUsersComponent,
    AddUserComponent,
    ProductDetailsComponent,
    ManageProductComponent,
    EditProductComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [UserService, AdminService, AuthGuardService, AdminGuardService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
