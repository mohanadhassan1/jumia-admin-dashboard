import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SignupComponent } from '../signup/signup.component';
import { ManageProductsComponent } from '../manage-products/manage-products.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-group-of-components',
  standalone: true,
  imports: [MatSidenavModule, LoginComponent, FormsModule, ReactiveFormsModule, SidebarComponent, MatGridListModule,RouterOutlet,RouterModule,SignupComponent,
      
    ReactiveFormsModule,ManageProductsComponent, MatDialogModule],
  templateUrl: './group-of-components.component.html',
  styleUrl: './group-of-components.component.scss'
})
export class GroupOfComponentsComponent {

}
