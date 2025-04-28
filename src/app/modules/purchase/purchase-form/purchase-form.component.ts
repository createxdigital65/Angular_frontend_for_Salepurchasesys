import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
})
export class PurchaseFormComponent implements OnInit {
  purchaseForm!: FormGroup;
  isEditMode = false;
  purchaseId!: number;

  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      id: [null],  // <-- Important: added id
      userId: [null, Validators.required],
      purchaseDate: [null, Validators.required],
      totalAmount: [null, Validators.required],
      status: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.purchaseId = +idParam;
        this.loadPurchase();
      }
    });
  }

  loadPurchase(): void {
    this.purchaseService.getPurchaseById(this.purchaseId).subscribe(purchase => {
      this.purchaseForm.patchValue({
        id: purchase.id, // <-- setting id too
        userId: purchase.userId,
        purchaseDate: purchase.purchaseDate,
        totalAmount: purchase.totalAmount,
        status: purchase.status
      });
    });
  }

  onSubmit(): void {
    if (this.purchaseForm.invalid) return;

    if (this.isEditMode) {
      this.purchaseService.updatePurchase(this.purchaseId, this.purchaseForm.value).subscribe(() => {
        this.router.navigate(['/purchases']);
      });
    } else {
      this.purchaseService.createPurchase(this.purchaseForm.value).subscribe(() => {
        this.router.navigate(['/purchases']);
      });
    }
  }
}
