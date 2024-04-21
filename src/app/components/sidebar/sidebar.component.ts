// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  providers: [provideNativeDateAdapter()],

  imports: [
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatListModule,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  vendor!: any;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // this.getVendorIdFromToken();
    this.vendor = this.getVendorIdFromToken();
  }

  logout(): void {
    console.log('log out...');

    this.authService.logout(); // Call the logout method from the AuthService
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }
  navigateToHome() {
    this.router.navigate(['/']);
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
