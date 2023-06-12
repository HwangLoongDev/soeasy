import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ProductGroupsComponent } from './product-groups/product-groups.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { BestSellerListComponent } from './best-seller-list/best-seller-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CoreModule } from 'src/app/@core/core.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { FormCategoryComponent } from './categories/form-category/form-category.component';
import { ListProductGroupsComponent } from './product-groups/list-product-groups/list-product-groups.component';
import { FormProductGroupComponent } from './product-groups/form-product-group/form-product-group.component';

const pmRoutes: Routes = [
  {
    path: '',
    redirectTo: 'products-management/product-list',
    pathMatch: 'full',
  },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoriesComponent },
  { path: 'product-groups', component: ProductGroupsComponent },
  { path: 'product-groups/:id', component: ProductGroupsComponent },
  { path: 'product-list', component: ProductsListComponent },
  { path: 'best-seller-list', component: BestSellerListComponent },
  { path: 'create', component: ProductFormComponent },
  { path: 'update/:id', component: ProductFormComponent },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductGroupsComponent,
    ProductsListComponent,
    BestSellerListComponent,
    ProductFormComponent,
    ListCategoriesComponent,
    FormCategoryComponent,
    ListProductGroupsComponent,
    FormProductGroupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pmRoutes),
    SharedModule,
    CoreModule,
  ],
})
export class ProductsManagementModule {}
