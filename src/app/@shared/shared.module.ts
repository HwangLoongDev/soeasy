import { NgModule } from '@angular/core';
import { AntModule } from './ant-module/ant.module';
import { AntIconModule } from './ant-module/icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [AntModule, AntIconModule, ReactiveFormsModule, FormsModule],
  exports: [AntModule, AntIconModule, ReactiveFormsModule, FormsModule],
  declarations: [],
  providers: [],
})
export class SharedModule {}
