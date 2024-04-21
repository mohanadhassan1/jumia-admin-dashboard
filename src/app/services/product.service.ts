import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.baseURL}/product`;
  httpHeader = {};

  constructor(private http: HttpClient) {
    this.httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  uploadImage(vals: any): Observable<any> {
    let data = vals;
    return this.http.post(
      'https://api.cloudinary.com/v1_1/dfig4pnef/image/upload',
      data
    );
  }
  getProductById(id: string): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IProduct>(url);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    console.log(product);

    return this.http.post<IProduct>(
      this.apiUrl,
      JSON.stringify(product),
      this.httpHeader
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const url = `${this.apiUrl}/${product._id}`;
    return this.http.patch<IProduct>(
      url,
      JSON.stringify(product),
      this.httpHeader
    );
  }

  deleteProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
