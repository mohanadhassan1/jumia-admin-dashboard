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

import { jwtDecode } from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
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
    
  }

  loadSubcategories(): void {
    this.subcategoryService.getAllSubcategories().subscribe(
      (res: ISubcategory[]) => {
        this.subcategories = res;
        // console.log('Subcategories:', this.subcategories);
      },
      (err: any) => {
        // Handle error, maybe show an error message
        this.toastr.error('Error fetching subcategories:','Error')
        console.error('Error fetching subcategories:', err);
      }
    );
  }


 



  submitForm() {
    console.log('Form values:', this.addProductForm.value);

    // Retrieve JWT token from localStorage
    const token = localStorage.getItem("token");
  
    // Check if token exists
    if (!token) {
      console.error('Token not found in localStorage');
      // Handle error appropriately, maybe redirect to login page or show an error message
      return;
    }
  
    // Decode the JWT token to get the vendor_id
    const decodedToken: any = jwtDecode(token);
    const vendorId = decodedToken.id;
  
    // Create the product object with vendor_id from decoded token and other form values
    const productData = {
      vendor_id: vendorId,
      ...this.addProductForm.value
    };
    // Call your service method to create the product
    this.productService.createProduct(productData).subscribe(
      (createdProduct: IProduct) => {
        // Handle success, maybe show a success message or redirect
        console.log('Product created:', createdProduct);
        this.toastr.success('Product created successfully','success message');
        
      },
      (err: any) => {
        // Handle error, maybe show an error message
        console.error('Error creating product:', err);
      }
    );
  }
}
