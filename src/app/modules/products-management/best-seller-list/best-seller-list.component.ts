import { Component, OnInit } from '@angular/core';
import {
  doc,
  getFirestore,
  updateDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { from } from 'rxjs';
import { BaseClass } from 'src/app/@core/base/base.class';
import {
  IProduct,
  IProductTransfer,
} from 'src/app/@core/models/products.model';
import { ProductService } from 'src/app/@shared/services/product.service';

@Component({
  selector: 'app-best-seller-list',
  templateUrl: './best-seller-list.component.html',
  styleUrls: ['./best-seller-list.component.scss'],
})
export class BestSellerListComponent extends BaseClass implements OnInit {
  dataSource: IProductTransfer[] = [];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  selected: IProductTransfer[] = [];
  loading: boolean = false;

  constructor(
    private message: NzMessageService,
    private productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.message.success('Lấy dữ liệu thành công!');
        this.dataSource = res.map((e) => ({ ...e, title: e.productName }));
      },
      error: (err) => {
        console.log(err);
        this.message.error('Có lỗi xảy ra!');
      },
    });
  }

  change(ret: TransferChange): void {
    this.loading = true;
    const listBestSeller = JSON.parse(JSON.stringify(ret.list));
    const batch = writeBatch(this.firestore);
    listBestSeller.forEach((e: any) => {
      delete e.title;
      const docRef = doc(this.firestore, 'products', e.id);
      console.log(e);

      batch.update(docRef, { ...e, direction: ret.to });
    });

    from(batch.commit()).subscribe({
      next: () => {
        this.message.success('Cập nhật dữ liệu thành công!');
        this.loading = false;
      },
      error: (err) => {
        this.message.error('Có lỗi xảy ra!');
        this.loading = false;
      },
    });
  }
}
