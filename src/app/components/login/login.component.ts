import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorserviceService } from '../../services/vendorservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  hidePassword: boolean = true;
loginForm!: FormGroup;

  constructor(private authService:AuthService,private formBuilder: FormBuilder , private router:Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required , Validators.minLength(8)]]
    })
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
  
  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     // console.log(this.loginForm.value,this.email,this.password);
      
  //     // Here you can perform any further actions, such as submitting the form data
  //     this.authService.login(this.loginForm.value.email,this.loginForm.value.password)

  //   } else {
  //     // If the form is not valid, handle the error or show validation messages
  //     console.log("not valid data");
      
  //   }
  
    
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(success => {
        if (success) {
          this.toastr.success('Login successful', 'Success').onShown.subscribe(success => {
          this.router.navigate(['/add-product']);
          });  

        } else {
          this.toastr.error('Login failed', 'Failed')
        }
      });
    } else {
      this.toastr.error('Invalid form data', 'Failed')
      
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
