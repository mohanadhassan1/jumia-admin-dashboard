import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/iproduct';

import { MatDialog } from '@angular/material/dialog';
import { ProductEditDialogComponent } from '../manage-products/product-edit-dialog/product-edit-dialog.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [MatFormField, MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTableModule, MatChipsModule, MatPaginatorModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})


export class ManageProductsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['index', 'name', 'brand', 'price', 'quantity_in_stock', 'description', 'actions'];

  selectedChip: string = 'All';
  chips: string[] = ['Brand', 'Price', 'Quantity'];

  dataSource = new MatTableDataSource<IProduct>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService, private dialog: MatDialog) { }


  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products: IProduct[]) => {
        
        const reversedProducts = products.reverse();
        this.dataSource.data = reversedProducts;

        // this.dataSource.data = products;
      },
      (error) => {
        console.error('Error fetching products: ', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChipSelect(event: any) {
    this.selectedChip = event.value;
    if (this.selectedChip === 'Quantity') {
      this.dataSource.data = this.dataSource.data.sort((a, b) => a.quantity_in_stock - b.quantity_in_stock);
    } else if (this.selectedChip === 'Price') {
      this.dataSource.data = this.dataSource.data.sort((a, b) => a.price - b.price);
    } else if (this.selectedChip === 'Brand') {
      const brandName = 'Harraz';
      this.dataSource.filterPredicate = (data: IProduct, filter: string) => data.brand.trim().toLowerCase() === filter;
      this.dataSource.filter = brandName.trim().toLowerCase();
    } else {
      this.loadProducts();
    }
  }

  
  
  editProduct(product: IProduct) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: '500px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedProduct: IProduct = result;

        this.productService.updateProduct(updatedProduct).subscribe(
          (updatedProduct) => {
            const index = this.dataSource.data.findIndex(p => p._id === updatedProduct._id);
            if (index !== -1) {
              this.dataSource.data[index] = updatedProduct;
              this.dataSource.paginator = this.paginator;
            }
            console.log('Product updated successfully:', updatedProduct);
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    });
  }

  // updateProduct(updateProduct: IProduct): void {

  //   this.productService.updateProduct(updateProduct).subscribe({
  //     next: (product) => {
  //       product.name = updateProduct.name;
  //       product.brand = updateProduct.brand;
  //       product.price = updateProduct.price;
  //       product.quantity_in_stock = updateProduct.quantity_in_stock;
  //       product.description = updateProduct.description;

  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching product details:', error);
  //     }
  //   })
  // }





  deleteProduct(product: IProduct) {

    console.log('Deleting product:', product);

    this.productService.deleteProduct(product._id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(p => p !== product);
        console.log('Product deleted successfully');
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

}

