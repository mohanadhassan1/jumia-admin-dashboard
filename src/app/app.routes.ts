
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
import { ProfileComponent } from './components/profile/profile.component';
import { ShopComponent } from './components/shop/shop.component';
import { BusinessInformationComponent } from './components/business-information/business-information.component';
import { ShoppingInformationComponent } from './components/shopping-information/shopping-information.component';
import { AdditionalInformationComponent } from './components/additional-information/additional-information.component';
import { CayalogDetailsComponent } from './components/cayalog-details/cayalog-details.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { PaymentInformationComponent } from './components/payment-information/payment-information.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
        path: '',
        component: GroupOfComponentsComponent,
        children: [
          { path: '', redirectTo: 'add-product', pathMatch: 'full' },
          { path: 'add-product', component: AddProductComponent , title: 'Add Product' , canActivate:[authGuard]},
          { path: 'orders', component: OrdersComponent ,title: 'Orders' , canActivate:[authGuard]},
          { path: 'manage-products', component: ManageProductsComponent ,title: 'Manage Products' , canActivate:[authGuard]},
          { path: 'home', component: HomeComponent ,title: 'Home' , canActivate:[authGuard]},
          {path: 'profile', component:ProfileComponent,title:'profile' , canActivate:[authGuard],children: [
          { path: 'orders', component: OrdersComponent },
          { path: 'manage-products', component: ManageProductsComponent },

          { path: 'home', component: HomeComponent },
          {path: 'profile', component:ProfileComponent,children: [
            {path:"shop",component:ShopComponent},
            {path:"business",component:BusinessInformationComponent},
            {path:"Shipping",component:ShoppingInformationComponent},
            {path:"additional",component:AdditionalInformationComponent,children:[
                {path:"catalogDetails",component:CayalogDetailsComponent},
                {path:"shopDetails",component:ShopDetailsComponent},
            ]},
            {path:"payment",component:PaymentInformationComponent},
        ] , },
        ],
      },
    
    { path: '**', component: NotFoundComponent }, // Redirect any other unknown routes to add-product

];
