import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { SignupComponent } from './components/signup/signup.component';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import {MatGridListModule} from '@angular/material/grid-list';
import { OrdersComponent } from "./components/orders/orders.component";
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';




@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    
    imports: [ MatSidenavModule, LoginComponent, FormsModule, ReactiveFormsModule, SidebarComponent, MatGridListModule,RouterOutlet,RouterModule,SignupComponent,
      BrowserModule,
      ReactiveFormsModule]
})
export class AppComponent {
  title = 'jumia-admin-dashboard';
}
