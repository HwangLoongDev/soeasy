import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

// Import what you need. RECOMMENDED. ✔️
import {
  UserOutline,
  TeamOutline,
  FileOutline,
  MenuUnfoldOutline,
  MenuFoldOutline,
  HomeOutline,
  InboxOutline,
  LogoutOutline,
  DownloadOutline,
} from '@ant-design/icons-angular/icons';
import { NgModule } from '@angular/core';

const icons: IconDefinition[] = [
  UserOutline,
  TeamOutline,
  FileOutline,
  MenuUnfoldOutline,
  MenuFoldOutline,
  HomeOutline,
  InboxOutline,
  LogoutOutline,
  DownloadOutline,
];

// Import all. NOT RECOMMENDED. ❌
// import * as AllIcons from '@ant-design/icons-angular/icons';

// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports: [NzIconModule.forRoot(icons)],
  exports: [NzIconModule],
})
export class AntIconModule {}
