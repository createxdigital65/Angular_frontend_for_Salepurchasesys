import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/models/purchase.model';
import { PurchaseDetail } from '../purchase/purchase-detail.model';

const API_URL = 'https://localhost:7281/api/purchase'; // Adjust if needed

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {
    constructor(private http: HttpClient) { }

    getAllPurchases(): Observable<Purchase[]> {
        return this.http.get<Purchase[]>(API_URL);
    }

    createPurchase(purchaseData: Purchase): Observable<Purchase> {
        return this.http.post<Purchase>(`${API_URL}`, purchaseData);
    }

    updatePurchase(id: number, purchaseData: Purchase): Observable<Purchase> {
        return this.http.put<Purchase>(`${API_URL}/${id}`, purchaseData);
    }

    getPurchaseById(id: number): Observable<Purchase> {
        return this.http.get<Purchase>(`${API_URL}/${id}`);
    }

    deletePurchase(id: number): Observable<void> {
        return this.http.delete<void>(`${API_URL}/${id}`);
    }
    getPurchaseDetailsByPurchaseId(purchaseId: number): Observable<PurchaseDetail[]> {
        return this.http.get<PurchaseDetail[]>(`${API_URL}/PurchaseDetail/purchase/${purchaseId}`);
    }

    createPurchaseDetail(detail: PurchaseDetail): Observable<PurchaseDetail> {
        return this.http.post<PurchaseDetail>(`${API_URL}/PurchaseDetail`, detail);
    }



}
