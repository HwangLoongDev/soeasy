import { NgModule } from '@angular/core';
import { ListsComponent } from './lists/lists.component';
import { FormsComponent } from './forms/forms.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CoreModule } from 'src/app/@core/core.module';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ListsComponent,
  },
  { path: 'create', component: FormsComponent },
  { path: 'update/:id', component: FormsComponent },
];

@NgModule({
  declarations: [ListsComponent, FormsComponent],
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    QuillModule.forRoot(),
  ],
})
export class NewsEventsModule {}
