import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { SharedModule } from '../@shared/shared.module';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './components/upload/upload.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';

@NgModule({
  imports: [CommonModule, LayoutModule, SharedModule],
  exports: [
    CommonModule,
    LayoutModule,
    EmptyDataComponent,
    UploadComponent,
    ImagePreviewComponent,
  ],
  providers: [],
  declarations: [EmptyDataComponent, UploadComponent, ImagePreviewComponent],
})
export class CoreModule {}
