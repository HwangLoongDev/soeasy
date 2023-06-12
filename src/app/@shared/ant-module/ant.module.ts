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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

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
  NzSelectModule,
  NzInputNumberModule,
  NzTransferModule,
  NzTagModule,
  NzPopconfirmModule,
  NzCheckboxModule,
];

@NgModule({
  imports: [...antModules],
  exports: [...antModules],
  providers: [],
})
export class AntModule {}
