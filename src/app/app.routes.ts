import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    { path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },
    { path: 'purchases', loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule) },
    { path: 'sales', loadChildren: () => import('./modules/sale/sale.module').then(m => m.SaleModule) },
    { path: 'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    {
        path: 'product-sub-categories',
        loadChildren: () => import('./modules/product/product-sub-category/product-sub-category-routing.module').then(m => m.ProductSubCategoryRoutingModule)
    },
    { path: 'purchase', loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule) },


];
