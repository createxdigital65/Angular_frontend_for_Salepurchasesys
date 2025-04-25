import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { Purchase } from 'src/app/models/purchase.model';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class PurchaseListComponent implements OnInit {
  purchases: Purchase[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.purchaseService.getAllPurchases().subscribe({
      next: (data) => {
        this.purchases = data;
      },
      error: (err) => {
        console.error('Failed to fetch purchases:', err);
      }
    });
  }

  editPurchase(id: number) {
    this.router.navigate(['/purchases/edit', id]);
  }


  deletePurchase(id: number): void {
    if (confirm('Are you sure you want to delete this purchase?')) {
      this.purchaseService.deletePurchase(id).subscribe({
        next: () => {
          this.loadPurchases(); // Refresh list
        },
        error: (err) => {
          console.error('Failed to delete purchase:', err);
        }
      });
    }
  }
}
