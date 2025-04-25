import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product.model';
import { UserService } from 'src/app/modules/user/user.service';
import { ProductSubCategoryService } from '../product-sub-category/product-sub-category.service'; // This matches the new location
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, RouterModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  users: any[] = [];
  subCategories: any[] = [];

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private ProductSubCategoryService: ProductSubCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
    this.loadSubCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to fetch products', err);
      },
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (err: any) => {
        console.error('Failed to fetch users', err);
      },
    });
  }

  loadSubCategories(): void {
    this.ProductSubCategoryService.getSubCategories().subscribe({
      next: (data: any) => {
        this.subCategories = data;
      },
      error: (err: any) => {
        console.error('Failed to fetch subcategories', err);
      },
    });
  }

  getUserName(userId: number): string {
    return this.users.find(u => u.id === userId)?.name || 'Unknown';
  }

  getSubCategoryName(subCategoryId: number): string {
    return this.subCategories.find(s => s.id === subCategoryId)?.name || 'Unknown';
  }

  editProduct(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }


  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts(); // refresh
        },
        error: (err) => {
          console.error('Failed to delete product', err);
        },
      });
    }
  }
}
