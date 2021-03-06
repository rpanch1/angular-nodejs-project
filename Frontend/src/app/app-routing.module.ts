import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CategoryComponent } from './components/category/category.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path: 'category', redirectTo: 'category/', pathMatch: 'full'}, // redirect to category with no filter param
  {path: 'category/:filter', component: CategoryComponent},       // redirect to category with filter param
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuardService]},
  {path: 'admin/add-new-product', component: AddProductComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'admin/products', component: ManageProductComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'admin/products/:id/edit', component: EditProductComponent},
  {path: 'admin/orders', component: ManageOrderComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService]},
  {path: 'admin/manage-users', component: ManageUsersComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'admin/add-user', component: AddUserComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'product-details/:id', component: ProductDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
