import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  providers: [DatePipe]
})
export class PurchaseFormComponent implements OnInit {
  purchaseForm!: FormGroup;
  isEditMode = false;
  purchaseId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      userId: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      totalAmount: [0, Validators.required],
      status: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.purchaseId = +idParam;
        this.loadPurchase(this.purchaseId);
      }
    });
  }

  loadPurchase(id: number) {
    this.purchaseService.getPurchaseById(id).subscribe({
      next: data => this.purchaseForm.patchValue(data),
      error: err => console.error('Error loading purchase', err)
    });
  }

  onSubmit() {
    if (this.purchaseForm.invalid) return;

    if (this.isEditMode) {
      this.purchaseService.updatePurchase(this.purchaseId, this.purchaseForm.value).subscribe({
        next: () => this.router.navigate(['/purchases']),
        error: err => console.error('Error updating purchase', err)
      });
    } else {
      this.purchaseService.createPurchase(this.purchaseForm.value).subscribe({
        next: () => this.router.navigate(['/purchases']),
        error: err => console.error('Error creating purchase', err)
      });
    }
  }
}
