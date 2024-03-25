import { MngprdComponent } from './components/mngprd/mngprd.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';

export const routes: Routes = [
    {path: '', component: AddproductComponent},
    {path: 'orders', component: OrdersComponent},
    {path: '**', component: AddproductComponent},


    // {path: 'signup', component: SignupComponent},
    {path: 'manage', component: ManageProductsComponent},
    {path: 'mng', component: MngprdComponent},
];
