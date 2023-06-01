import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/@shared/shared.module';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [],
  providers: [],
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent, BreadcrumbComponent, UserMenuComponent],
})
export class LayoutModule {}
