import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorserviceService } from '../../services/vendorservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  hidePassword: boolean = true;
loginForm!: FormGroup;

  constructor(private vendorSevice:VendorserviceService,private formBuilder: FormBuilder , private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required , Validators.minLength(8)]]
    })
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value,this.email,this.password);
      
      // Here you can perform any further actions, such as submitting the form data
      this.vendorSevice.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(data => {
        // console.log(data)
        localStorage.setItem("token", JSON.stringify(data));
        alert("successful")
        this.router.navigate(['/add-product']);

      })

    } else {
      // If the form is not valid, handle the error or show validation messages
      console.log("not valid data");
      
    }
  
    
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
