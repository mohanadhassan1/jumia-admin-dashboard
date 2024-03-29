import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IProduct } from '../../models/iproduct';
import { ISubcategory } from '../../models/isubcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import * as jwt from 'jsonwebtoken';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  subcategories!: ISubcategory[];
  addProductForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private subcategoryService: SubcategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      quantity_in_stock: [0, Validators.required],
      brand: ['', Validators.required],
      subcategory_id: ['', Validators.required], // Update to match form control name
      images: ['', Validators.required],
      // vendor_id: ['', Validators.required],
    });

    this.loadSubcategories()
    this.verifyToken() 
  }

  loadSubcategories(): void {
    this.subcategoryService.getAllSubcategories().subscribe(
      (res: ISubcategory[]) => {
        this.subcategories = res;
        // console.log('Subcategories:', this.subcategories);
      },
      (err: any) => {
        // Handle error, maybe show an error message
        console.error('Error fetching subcategories:', err);
      }
    );
  }


  verifyToken(): any {
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(['/login']);
    }
    else {
      var decoded = jwt.verify(token, 'shhhhh');
      console.log(decoded)
    }
  }



  submitForm() {
    console.log('Form values:', JSON.stringify(this.addProductForm.value));
    console.log(localStorage.getItem("token"));


    // Assign subcategory_id from form value to product

    // Call your service method to create the product
    this.productService.createProduct(this.addProductForm.value).subscribe(
      (createdProduct: IProduct) => {
        // Handle success, maybe show a success message or redirect
        console.log('Product created:', createdProduct);
      },
      (err: any) => {
        // Handle error, maybe show an error message
        console.error('Error creating product:', err);
      }
    );
  }
}
