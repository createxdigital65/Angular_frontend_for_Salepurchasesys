import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { ProductSubCategoryService } from 'src/app/modules/product/product-sub-category/product-sub-category.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  productId!: number;

  product: Product = {
    id: 0,
    name: '',
    userId: 0,
    productSubCategoryId: 0,
    price: 0,
    stock: 0,
  };

  users: any[] = [];
  subCategories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private subCategoryService: ProductSubCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Get product details
    this.productService.getProducts().subscribe((products) => {
      const found = products.find((p) => p.id === this.productId);
      if (found) this.product = found;
    });

    // Fetch users
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    // Fetch subcategories
    this.subCategoryService.getSubCategories().subscribe((subs) => {
      this.subCategories = subs;
    });
  }

  save(): void {
    this.productService.updateProduct(this.productId, this.product).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Failed to update product', err);
        alert('Failed to update product.');
      },
    });
  }
}
