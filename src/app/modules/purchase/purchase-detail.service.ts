import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurchaseDetail } from '../../models/purchase-detail.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // adjust this if needed

@Injectable({
    providedIn: 'root'
})
export class PurchaseDetailService {
    private apiUrl = environment.apiUrl + '/purchasedetail';

    constructor(private http: HttpClient) { }

    getPurchaseDetailsByPurchaseId(purchaseId: number): Observable<PurchaseDetail[]> {
        return this.http.get<PurchaseDetail[]>(`${this.apiUrl}/purchase/${purchaseId}`);
    }

    createPurchaseDetail(detail: PurchaseDetail) {
        return this.http.post<PurchaseDetail>(`${this.apiUrl}`, detail);
    }


}
