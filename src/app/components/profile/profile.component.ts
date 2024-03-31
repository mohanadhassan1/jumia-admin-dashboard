import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent { 
  constructor(private router: Router) {}
  isClickedShop: boolean = false;
  isClickedBdiness: boolean = false;
  isClickedShopping: boolean = false;
  isClickedAdditional: boolean = false;
  isClickedPayment: boolean = false;

  goToShop() {
    this.isClickedShop = true;
    this.isClickedBdiness = false;
    this.isClickedShopping = false;
    this.isClickedAdditional = false;
    this.isClickedPayment = false;

    this.router.navigateByUrl('profile/shop');
  }
  goToBusinessInfo() {
    this.isClickedShop = false;
    this.isClickedBdiness = true;
    this.isClickedShopping = false;
    this.isClickedAdditional = false;
    this.isClickedPayment = false;
    this.router.navigateByUrl('profile/business');
  }
  goToShoppingInfo() {
    this.isClickedShop = false;
    this.isClickedBdiness = false;
    this.isClickedShopping = true;
    this.isClickedAdditional = false;
    this.isClickedPayment = false;
    this.router.navigateByUrl('profile/Shipping');
  }
  goToPaymentInfo() {
    this.isClickedShop = false;
    this.isClickedBdiness = false;
    this.isClickedShopping = false;
    this.isClickedAdditional = false;
    this.isClickedPayment = true;
    this.router.navigateByUrl('profile/payment');
  }
  goToAdditionalInfo() {
    this.isClickedShop = false;
    this.isClickedBdiness = false;
    this.isClickedShopping = false;
    this.isClickedAdditional = true;
    this.isClickedPayment = false;
    this.router.navigateByUrl('profile/additional');
  }
}
