import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7281/api/purchase'; // Adjust if needed

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {
    constructor(private http: HttpClient) { }

    getAllPurchases(): Observable<any[]> {
        return this.http.get<any[]>(API_URL);
    }

    createPurchase(purchaseData: any) {
        return this.http.post(`${API_URL}`, purchaseData);
    }

    updatePurchase(id: number, purchaseData: any) {
        return this.http.put(`${API_URL}/${id}`, purchaseData);
    }

    getPurchaseById(id: number) {
        return this.http.get(`${API_URL}/${id}`);
    }

    deletePurchase(id: number): Observable<any> {
        return this.http.delete(`${API_URL}/${id}`);
    }
}
