import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const antModules = [
  NzButtonModule,
  NzTypographyModule,
  NzDividerModule,
  NzGridModule,
  NzLayoutModule,
  NzSpaceModule,
  NzAffixModule,
  NzBreadCrumbModule,
  NzDropDownModule,
  NzMenuModule,
  NzTableModule,
  NzEmptyModule,
  NzInputModule,
  NzFormModule,
  NzDatePickerModule,
  NzUploadModule,
];

@NgModule({
  imports: [...antModules],
  exports: [...antModules],
  providers: [],
})
export class AntModule {}
