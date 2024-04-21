import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../models/iproduct';

import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-edit-dialog',
  standalone: true,
  imports: [MatFormField, MatTableModule, MatFormFieldModule, MatInputModule, MatTableModule, MatChipsModule, MatPaginatorModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent {

  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: IProduct },
    private fb: FormBuilder,
    private productService: ProductService

  ) {
    this.productForm = this.fb.group({
      name: [data.product.name, Validators.required],
      brand: [data.product.brand, Validators.required],
      price: [data.product.price, Validators.required],
      quantity_in_stock: [data.product.quantity_in_stock, Validators.required],
      description: [data.product.description]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {
      const editedProduct: IProduct = { _id: this.data.product._id ,...this.productForm.value};
      
      console.log(editedProduct);

      this.dialogRef.close(editedProduct);
      this.productService.updateProduct(editedProduct).subscribe(
        (updatedProduct: IProduct) => {
          console.log('Product updated successfully:', updatedProduct);

          this.dialogRef.close(updatedProduct);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );


    }
  }
}
