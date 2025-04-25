import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductSubCategoryService } from './product-sub-category.service';
import { ProductSubCategory } from 'src/app/models/product-subcategory.model';
import { ProductCategoryService } from '../product-category.service'; // Import service
import { ProductCategory } from 'src/app/models/product-category.model'; // Import model

@Component({
    selector: 'app-product-sub-category-form',
    standalone: true,
    templateUrl: './product-sub-category-form.component.html',
    styleUrls: ['./product-sub-category-form.component.css'],
    imports: [CommonModule, FormsModule],
})
export class ProductSubCategoryFormComponent implements OnInit {
    isEditMode = false;
    subCategoryId!: number;
    subCategory: ProductSubCategory = {
        id: 0,
        name: '',
        productCategoryId: 0
    };

    categories: ProductCategory[] = []; // List of categories

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private subCategoryService: ProductSubCategoryService,
        private categoryService: ProductCategoryService // Inject service
    ) { }

    ngOnInit(): void {
        this.loadCategories(); // Load categories first

        const idParam = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!idParam;

        if (this.isEditMode) {
            this.subCategoryId = Number(idParam);
            this.subCategoryService.getSubCategories().subscribe(subCategories => {
                const found = subCategories.find(s => s.id === this.subCategoryId);
                if (found) this.subCategory = found;
            });
        }
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (data) => this.categories = data,
            error: (err) => console.error('Failed to fetch categories', err)
        });
    }

    goBack(): void {
        this.router.navigate(['/product-sub-categories']);
    }

    save(): void {
        console.log('Saving subcategory:', this.subCategory); // ✅ Add this line

        if (this.isEditMode) {
            this.subCategoryService.updateSubCategory(this.subCategoryId, this.subCategory).subscribe({
                next: () => {
                    alert('Subcategory updated successfully!');
                    this.router.navigate(['/product-sub-categories']);
                },
                error: (err) => {
                    console.error('Update failed:', err); // ✅ Log error
                    alert('Update failed.');
                }
            });
        } else {
            this.subCategoryService.createSubCategory(this.subCategory).subscribe({
                next: () => {
                    alert('Subcategory created successfully!');
                    this.router.navigate(['/product-sub-categories']);
                },
                error: (err) => {
                    console.error('Creation failed:', err); // ✅ Log error
                    alert('Creation failed.');
                }
            });
        }
    }


}
