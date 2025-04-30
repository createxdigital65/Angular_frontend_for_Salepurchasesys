import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PurchaseRoutingModule } from './purchase-routing.module';

@NgModule({
  declarations: [
    // No need to declare PurchaseFormComponent here anymore
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
