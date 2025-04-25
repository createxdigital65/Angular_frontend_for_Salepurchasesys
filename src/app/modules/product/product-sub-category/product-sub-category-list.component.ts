import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductSubCategoryService } from './product-sub-category.service';
import { ProductSubCategory } from 'src/app/models/product-subcategory.model';

@Component({
    selector: 'app-product-sub-category-list',
    standalone: true,
    templateUrl: './product-sub-category-list.component.html',
    styleUrls: ['./product-sub-category-list.component.css'],
    imports: [CommonModule, RouterModule],
})
export class ProductSubCategoryListComponent implements OnInit {
    subCategories: ProductSubCategory[] = [];

    constructor(
        public subCategoryService: ProductSubCategoryService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.loadSubCategories();
    }

    loadSubCategories(): void {
        this.subCategoryService.getSubCategories().subscribe({
            next: (data) => {
                this.subCategories = data;
            },
            error: (err) => {
                console.error('Failed to fetch subcategories', err);
            },
        });
    }

    editSubCategory(id: number): void {
        this.router.navigate(['/product-sub-categories/edit', id]);
    }

    deleteSubCategory(id: number): void {
        if (confirm('Are you sure you want to delete this subcategory?')) {
            this.subCategoryService.deleteSubCategory(id).subscribe({
                next: () => {
                    this.loadSubCategories(); // Refresh the list
                },
                error: (err) => {
                    console.error('Failed to delete subcategory', err);
                }
            });
        }
    }
}
