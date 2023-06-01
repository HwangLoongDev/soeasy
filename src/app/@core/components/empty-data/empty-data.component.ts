import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss'],
})
export class EmptyDataComponent {
  @Input() callback!: Function;
  @Input() btnLabel: string = 'Create Now';
  @Input() description: string = 'Không tìm thấy dữ liệu phù hợp';
  onClick() {
    this.callback();
  }
}
