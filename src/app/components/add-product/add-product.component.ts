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

import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgxDropzoneModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  subcategories!: ISubcategory[];
  addProductForm!: FormGroup;
  imageUrls: string[] = []; // Define imageUrls array

  constructor(
    private productService: ProductService,
    private subcategoryService: SubcategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      quantity_in_stock: [0, Validators.required],
      brand: ['', Validators.required],
      subcategory_id: ['', Validators.required], // Update to match form control name
      // images: ['', Validators.required],
      // vendor_id: ['', Validators.required],
    });

    this.loadSubcategories();
  }

  //============================< image upload >================================================

  files: File[] = [];

  onSelectImage(event: any) {
    this.files.push(...event.addedFiles);
    console.log(this.files.slice(0 - 4));
  }

  onRemoveImges(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  loadSubcategories(): void {
    this.subcategoryService.getAllSubcategories().subscribe(
      (res: ISubcategory[]) => {
        this.subcategories = res;
      },
      (err: any) => {
        this.toastr.error('Error fetching subcategories:', 'Error');
        console.error('Error fetching subcategories:', err);
      }
    );
  }

  submitForm() {
    console.log('Form values:', this.addProductForm.value);

    this.uploadImagesSequentially(0);
  }

  uploadImagesSequentially(index: number) {
    if (index < this.files.length) {
      const imageFormData = new FormData();
      imageFormData.append('file', this.files[index]);
      imageFormData.append('upload_preset', 'angular-preset');
      imageFormData.append('cloud_name', 'dfig4pnef');

      this.productService.uploadImage(imageFormData).subscribe((imageRes) => {
        this.imageUrls.push(imageRes.secure_url);
        this.uploadImagesSequentially(index + 1);
        console.log('imgs', this.imageUrls);
      });
    } else {
      const productData = {
        vendor_id: this.getVendorIdFromToken(),
        ...this.addProductForm.value,
        images: this.imageUrls,
      };

      this.productService.createProduct(productData).subscribe(
        (createdProduct: IProduct) => {
          console.log('Product created:', createdProduct);
          this.toastr.success('Product created successfully', 'Success');
        },
        (err: any) => {
          console.error('Error creating product:', err);
        }
      );
    }
  }

  getVendorIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return '';
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.id;
  }
}
