import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ivendor} from '../models/ivendor';

@Injectable({
  providedIn: 'root'
})
export class VendorserviceService {


 user:BehaviorSubject<boolean>

  constructor(private httpclient:HttpClient) {
    this.user=new BehaviorSubject<boolean>(this.isUserLogged)
   }
   
   getAllUsers():Observable<Ivendor[]>{
    return this.httpclient.get<Ivendor[]>('http://localhost:3000/users')

  
 }
 adduser(user:Ivendor):Observable<Ivendor>{
  return  this.httpclient.post<Ivendor>(`http://localhost:3000/users`,JSON.stringify(user))


 
 }
   login(userName:string,userPassoword:string){
    let usertoken="234567"
    localStorage.setItem("userToken",usertoken)
    this.user.next(true)

   }
   logout(){
    localStorage.removeItem("userToken")
    this.user.next(false)
   }
  get isUserLogged(){
    return localStorage.getItem("userToken")?true:false;

  }
  getuserstate():Observable<boolean>{
    return this.user.asObservable();
  }
}
