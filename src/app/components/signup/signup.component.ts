import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import {  FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Ivendor } from '../../models/ivendor';
import { VendorserviceService } from '../../services/vendorservice.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  formGroup1:FormGroup;
  isuser:boolean=true;
  newuser:Ivendor={} as Ivendor

  constructor(private formbuilder:FormBuilder,private userAuth:VendorserviceService,
    ){
    this.isuser=this.userAuth.isUserLogged
    this.formGroup1=this.formbuilder.group({
      fullName:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      mobile:this.formbuilder.array([]),
      address:this.formbuilder.array([])

    })
  }
  get fullName(){
    return this.formGroup1.get('fullName');
  }
  get email(){
    return this.formGroup1.get('email');
  }
  get mobile(){
    return this.formGroup1.get('mobile') as FormArray;
  }
  get password(){
    return this.formGroup1.get('password');
  }
  
  get address(){
    return this.formGroup1.get('address') as FormArray;

  }

  
  newAddress():FormGroup{
    return this.formbuilder.group({
      city:'',
      postalCode:'',
      street:''
    })
  }
  newMobile():FormGroup{
    return this.formbuilder.group({
      phone:'',
      
    })
  }
  addAddress(){
    this.address.push(this.newAddress())
  }
  addMobile(){
    
this.mobile.push(this.newMobile())
  }
  removeAddress(i:number){

    this.address.removeAt(i);

  }
  removeMobile(i:number){
    this.mobile.removeAt(i)
  }

  loginFunc(){
    this.userAuth.login("asdfgh","345678")
    this.isuser=this.userAuth.isUserLogged


  }
  logoutFunc(){
    this.userAuth.logout()
    this.isuser=this.userAuth.isUserLogged
  }
  addNewUser(){
    this.userAuth.adduser(this.newuser).subscribe({
      next:(data)=>{
        console.log(data)
       
      },
    error:(err)=>{
      console.log(err)
    }
    })

  }
}
