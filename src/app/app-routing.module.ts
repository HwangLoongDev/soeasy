import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './@core/layout/components/layout/layout.component';
import { AuthGuard } from './@core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('./modules/register-customers/register-customer.module').then(
            (m) => m.RegisterCustomersModule
          ),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./modules/news-events/news-events.module').then(
            (m) => m.NewsEventsModule
          ),
      },
      {
        path: 'products-management',
        loadChildren: () =>
          import(
            './modules/products-management/products-management.module'
          ).then((m) => m.ProductsManagementModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
