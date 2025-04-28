import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';

export const routes: Routes = [
  { path: '', component: PurchaseListComponent },
  { path: 'create', component: PurchaseFormComponent },
  { path: 'edit/:id', component: PurchaseFormComponent },
  { path: ':id', component: PurchaseDetailComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
