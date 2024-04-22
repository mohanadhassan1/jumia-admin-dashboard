import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RatingComponent } from './rating/rating.component';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { __values } from 'tslib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    RatingComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  decodedToken: any;
  s: any;
  token: any;
  tokObject: any;
  tok: any;
  vendor!: any;

  constructor() {}

  ngOnInit(): void {
    // this.token = localStorage.getItem('token');
    // this.tokObject = JSON.parse(this.token);
    // this.tok = this.tokObject.token;
    // console.log(this.tok);
    // try {
    //   this.decodedToken = jwtDecode(this.tok); // Pass tok variable to jwt_decode
    //   console.log(this.decodedToken);
    // } catch (error) {
    //   console.error('Error decoding token:', error);
    // }

    this.vendor = this.getVendorIdFromToken();
    // console.log(this.vendor);
  }

  getVendorIdFromToken(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return '';
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken;
  }
}
