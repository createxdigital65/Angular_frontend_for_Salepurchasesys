import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSubCategoryListComponent } from './product-sub-category-list.component';
import { ProductSubCategoryFormComponent } from './product-sub-category-form.component';

const routes: Routes = [
    { path: '', component: ProductSubCategoryListComponent },
    { path: 'create', component: ProductSubCategoryFormComponent },
    { path: 'edit/:id', component: ProductSubCategoryFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductSubCategoryRoutingModule { }
