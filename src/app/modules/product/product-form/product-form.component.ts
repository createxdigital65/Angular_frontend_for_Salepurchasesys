import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  isEditMode = false;
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
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    // Fetch users and subcategories
    this.productService.getUsers().subscribe((res) => (this.users = res));
    this.productService.getSubCategories().subscribe((res) => (this.subCategories = res));

    if (this.isEditMode) {
      this.productId = Number(id);
      this.productService.getProducts().subscribe((products) => {
        const found = products.find((p) => p.id === this.productId);
        if (found) this.product = found;
      });
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, this.product).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => alert('Update failed'),
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          alert('Product created successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => alert('Create failed'),
      });
    }
  }
}
