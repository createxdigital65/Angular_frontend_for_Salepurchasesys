import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseRoutingModule } from './purchase-routing.module';

@NgModule({
  declarations: [
    PurchaseFormComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PurchaseRoutingModule,
    PurchaseListComponent
  ]
})
export class PurchaseModule { }
