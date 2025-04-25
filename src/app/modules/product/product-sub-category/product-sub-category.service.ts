import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSubCategory } from 'src/app/models/product-subcategory.model';

@Injectable({
    providedIn: 'root'
})
export class ProductSubCategoryService {
    private apiUrl = 'https://localhost:7281/api/ProductSubCategory';

    constructor(private http: HttpClient) { }

    getSubCategories(): Observable<ProductSubCategory[]> {
        return this.http.get<ProductSubCategory[]>(this.apiUrl);
    }

    createSubCategory(subCategory: ProductSubCategory): Observable<ProductSubCategory> {
        return this.http.post<ProductSubCategory>(this.apiUrl, subCategory);
    }

    deleteSubCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateSubCategory(id: number, subCategory: ProductSubCategory) {
        return this.http.put(`${this.apiUrl}/${id}`, subCategory);
    }
}
