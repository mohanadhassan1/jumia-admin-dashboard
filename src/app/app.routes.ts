
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AppComponent } from './app.component';
import { GroupOfComponentsComponent } from './components/group-of-components/group-of-components.component';
import { HomeComponent } from './components/home/home.component';
// import { AddproductComponent } from './components/addproduct/addproduct.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
        path: '',
        component: GroupOfComponentsComponent,
        children: [
          { path: '', redirectTo: 'add-product', pathMatch: 'full' },
          { path: 'add-product', component: AddProductComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'manage-products', component: ManageProductsComponent },
          { path: 'home', component: HomeComponent },
        ],
      },
      { path: '**', redirectTo: 'login' }, // Redirect any other unknown routes to add-product

];
