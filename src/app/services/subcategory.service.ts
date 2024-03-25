import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubcategory } from '../models/isubcategory'; // Assuming you have an ISubcategory interface

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private apiUrl = `${environment.baseURL}/subcategory`; // Update the API URL accordingly
  httpHeader = {};

  constructor(private http: HttpClient) {
    this.httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  getAllSubcategories(): Observable<ISubcategory[]> {
    return this.http.get<ISubcategory[]>(this.apiUrl);
  }

  getSubcategoryById(id: string): Observable<ISubcategory> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ISubcategory>(url);
  }

  createSubcategory(subcategory: ISubcategory): Observable<ISubcategory> {
    return this.http.post<ISubcategory>(
      this.apiUrl,
      subcategory,
      this.httpHeader
    );
  }

  updateSubcategory(subcategory: ISubcategory): Observable<ISubcategory> {
    const url = `${this.apiUrl}/${subcategory._id}`;
    return this.http.patch<ISubcategory>(url, subcategory, this.httpHeader);
  }

  deleteSubcategory(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
