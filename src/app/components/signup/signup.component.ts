import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {  FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Ivendor } from '../../models/ivendor';
import { VendorserviceService } from '../../services/vendorservice.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';








@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule,MatInputModule,
    MatIconModule,   
     MatCheckboxModule,
  RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  
  
  nameErrorMessage = '';
  emailErrorMessage=';'
  passwordErrorMessage='';

  newvendor:Ivendor={} as Ivendor
  
  hideRequiredControl = new FormControl(false);
  hide = true;
  vendorForm!: FormGroup ;
  email!: FormControl;
  name!: FormControl;
  password!: FormControl;


  
  constructor(private formbuilder:FormBuilder,private vendorAuth:VendorserviceService,) {}
   ngOnInit(): void {
    this.vendorForm=this.formbuilder.group({
      name:['',[Validators.required,Validators.minLength(5)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        phone_number:['',[Validators.required,Validators.minLength(9)]],
        address:['',[Validators.required,Validators.minLength(6)]]
     })
    this.email = this.vendorForm.get('email') as FormControl;
    this.name=this.vendorForm.get('name') as FormControl
    this.password=this.vendorForm.get('password') as FormControl


    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
   }
  
  
  

  updateErrorMessage() {
  
  if (this.name.hasError('required')) {
    this.nameErrorMessage = 'This field is required';
  } else if (this.name.hasError('minlength')) {
    const requiredLength = this.name.errors?.['minlength']?.requiredLength;
    this.nameErrorMessage = `Minimum length is ${requiredLength}`;
  } else {
    this.nameErrorMessage = '';
  }

  if (this.email.hasError('required')) {
    this.emailErrorMessage = 'This field is required';
  } else if (this.email.hasError('email')) {
    this.emailErrorMessage = 'Not a valid email';
  } else {
    this.emailErrorMessage = '';
  }

  if (this.password.hasError('required')) {
    this.passwordErrorMessage = 'This field is required';
  } else if (this.password.hasError('minlength')) {
    const requiredLength = this.password.errors?.['minlength'].requiredLength;
    this.passwordErrorMessage = `Minimum length is ${requiredLength}`;
  } else if (this.password.hasError('maxlength')) {
    const maxLength = this.password.errors?.['maxlength'].requiredLength;
    this.passwordErrorMessage = `Maximum length is ${maxLength}`;
  } else {
    this.passwordErrorMessage = '';
  }
  }
  addNewVendor(){
    console.log('Form values:', JSON.stringify(this.vendorForm.value));

    this.vendorAuth.addVendor(this.vendorForm.value).subscribe({
      next:(data)=>{
        console.log(data)
        alert("successful")
       
      },
    error:(err)=>{
      console.log(err)
      alert("errror")
    }
    })


  }
 
  
}
