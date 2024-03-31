import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-additional-information',
  standalone: true,
  imports: [RouterOutlet ],
  templateUrl: './additional-information.component.html',
  styleUrl: './additional-information.component.scss'
})
export class AdditionalInformationComponent {
  constructor(private router: Router) {}
  isClickedShopDetails: boolean = false;
  isClickedCatalogDetails: boolean = false;

  goToShopDetails() {
    this.isClickedShopDetails=true;
    this.isClickedCatalogDetails=false;

    this.router.navigateByUrl('profile/additional/shopDetails');
  }

  goToCatalogDetails() {
    this.isClickedShopDetails=false;
    this.isClickedCatalogDetails=true;

    this.router.navigateByUrl('profile/additional/catalogDetails');
  }

}
