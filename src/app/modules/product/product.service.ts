import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'https://localhost:7281/api/Product'; // Adjust if different

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }
    // Assuming these exist in your backend
    getUsers(): Observable<any[]> {
        return this.http.get<any[]>('https://localhost:7281/api/User');
    }

    getSubCategories(): Observable<any[]> {
        return this.http.get<any[]>('https://localhost:7281/api/ProductSubCategory');
    }
    // We'll add add/update/delete methods later
    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product);
    }


    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`https://localhost:7281/api/Product/${id}`);
    }
    updateProduct(id: number, product: Product) {
        return this.http.put(`https://localhost:7281/api/Product/${id}`, product);
    }

}
