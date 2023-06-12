import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { SharedModule } from 'src/app/@shared/shared.module';

const rcRoutes: Routes = [
  {
    path: '',
    component: ListCustomersComponent,
  },
];

@NgModule({
  declarations: [ListCustomersComponent],
  imports: [CommonModule, RouterModule.forChild(rcRoutes), SharedModule],
  exports: [],
  providers: [],
})
export class RegisterCustomersModule {}
