import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VendorserviceService } from './vendorservice.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(
    private vendorService: VendorserviceService,
    private router: Router
  ) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(localStorage.getItem('token') !== null);
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.vendorService.login(email, password).subscribe(
        (data) => {
          localStorage.setItem("token", JSON.stringify(data));
          this.isLoggedInSubject.next(true);
          observer.next(true);
          observer.complete();
        },
        
        (error) => {
          console.error("Login failed:", error);
          alert("Login failed. Please try again.");
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  logout(): void {
    localStorage.removeItem("token");
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean>  {
    return this.isLoggedInSubject.asObservable();
  }
}
