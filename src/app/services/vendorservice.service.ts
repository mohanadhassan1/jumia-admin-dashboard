import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ivendor} from '../models/ivendor';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VendorserviceService {
  private apiUrl = `${environment.baseURL}/vendor`;
  httpHeader = {};




  constructor(private httpclient:HttpClient) {
    this.httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    
   }
   
   getAllVendors():Observable<Ivendor[]>{
    return this.httpclient.get<Ivendor[]>(this.apiUrl)


  
 }
 addVendor(vendor:Ivendor):Observable<Ivendor>{
  console.log(vendor)
  return  this.httpclient.post<Ivendor>(this.apiUrl,JSON.stringify(vendor), this.httpHeader)


 
 }

 login(email: string, password: string): Observable<any> {
  // Assuming you have an endpoint for login, you can replace 'loginUrl' with your actual login endpoint
  const loginUrl = `${this.apiUrl}/login`;
  const loginData = { email, password };
  return this.httpclient.post(loginUrl, JSON.stringify(loginData), this.httpHeader);
}
  
}
