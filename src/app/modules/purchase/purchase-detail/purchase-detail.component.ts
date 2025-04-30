import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { Purchase } from 'src/app/models/purchase.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- needed
import { PurchaseDetailListComponent } from '../purchase-detail-list/purchase-detail-list.component';

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, PurchaseDetailListComponent],
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {
  purchaseId!: number;
  purchase!: Purchase;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    this.purchaseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.purchaseId) {
      this.loadPurchase();
    }
  }

  loadPurchase(): void {
    this.purchaseService.getPurchaseById(this.purchaseId).subscribe({
      next: (data) => {
        this.purchase = data;
      },
      error: (err) => {
        console.error('Error loading purchase:', err);
        this.router.navigate(['/purchases']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/purchases']);
  }
}
