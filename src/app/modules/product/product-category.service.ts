// src/app/modules/product/product-category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/models/product-category.model';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    private baseUrl = 'https://localhost:7281/api/ProductCategory'; // Adjust base URL if needed

    constructor(private http: HttpClient) { }

    getCategories(): Observable<ProductCategory[]> {
        return this.http.get<ProductCategory[]>(this.baseUrl);
    }

    getCategoryById(id: number): Observable<ProductCategory> {
        return this.http.get<ProductCategory>(`${this.baseUrl}/${id}`);
    }

    createCategory(category: ProductCategory): Observable<ProductCategory> {
        return this.http.post<ProductCategory>(this.baseUrl, category);
    }

    updateCategory(id: number, category: ProductCategory): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, category);
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
