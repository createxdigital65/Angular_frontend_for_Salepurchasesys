import { Component, Input, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../purchase.service';
import { PurchaseDetail } from '../purchase-detail.model';

@Component({
  selector: 'app-purchase-detail-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-detail-list.component.html',
  styleUrls: ['./purchase-detail-list.component.css']
})
export class PurchaseDetailListComponent implements OnInit {
  @Input() purchaseId!: number;
  purchaseDetails: any[] = [];

  newDetail: {
    productId: number | null;
    quantity: number | null;
    SubTotal: number | null;
  } = {
      productId: null,
      quantity: null,
      SubTotal: null
    };

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    if (this.purchaseId) {
      this.loadPurchaseDetails();
    }
  }

  loadPurchaseDetails(): void {
    this.purchaseService.getPurchaseDetailsByPurchaseId(this.purchaseId).subscribe(details => {
      this.purchaseDetails = details;
    });
  }

  addPurchaseDetail(): void {
    if (!this.newDetail.productId || !this.newDetail.quantity || !this.newDetail.SubTotal) {
      return;
    }

    const detailToSend: PurchaseDetail = {
      id: 0,
      purchaseId: this.purchaseId,
      productId: this.newDetail.productId!,
      quantity: this.newDetail.quantity!,
      SubTotal: this.newDetail.SubTotal!,
      unitPrice: 0
    };

    this.purchaseService.createPurchaseDetail(detailToSend).subscribe(() => {
      this.newDetail = { productId: null, quantity: null, SubTotal: null };
      this.loadPurchaseDetails();
    });
  }

}

