import { Component, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/@core/base/base.class';
import { CustomersService } from './../../../@shared/services/customers.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ICusomter } from 'src/app/@core/models/customer.model';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
})
export class ListCustomersComponent extends BaseClass implements OnInit {
  collection: ICusomter[] = [];
  loading: boolean = false;
  constructor(
    private customersService: CustomersService,
    private message: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.loading = true;
    this.customersService.getAllCustomers().subscribe({
      next: (collection) => {
        this.collection = collection;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.message.error('Có lỗi xảy ra!');
        this.loading = false;
      },
    });
  }
}
