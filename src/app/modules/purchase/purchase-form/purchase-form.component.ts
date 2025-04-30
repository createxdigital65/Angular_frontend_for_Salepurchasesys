import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../purchase.service';
import { PurchaseDetailListComponent } from '../purchase-detail-list/purchase-detail-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-purchase-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    PurchaseDetailListComponent
  ],
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
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
      id: [null],
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
      this.purchaseForm.patchValue(purchase);
    });
  }

  onSubmit(): void {
    if (this.purchaseForm.invalid) return;

    const save$ = this.isEditMode
      ? this.purchaseService.updatePurchase(this.purchaseId, this.purchaseForm.value)
      : this.purchaseService.createPurchase(this.purchaseForm.value);

    save$.subscribe(() => this.router.navigate(['/purchases']));
  }
}
