import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IProductGroups } from 'src/app/@core/models/product-groups.model';
import { ProductGroupsService } from 'src/app/@shared/services/product-groups.service';

@Component({
  selector: 'app-list-product-groups',
  templateUrl: './list-product-groups.component.html',
  styleUrls: ['./list-product-groups.component.scss'],
})
export class ListProductGroupsComponent implements OnInit {
  collection: IProductGroups[] = [];
  loading: boolean = false;

  constructor(
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _productGroupsService: ProductGroupsService
  ) {}

  ngOnInit(): void {
    this.getAllProductGroups();
  }

  getAllProductGroups() {
    this.loading = true;
    this._productGroupsService.getAllProductGroups().subscribe({
      next: (collection) => {
        this.collection = collection
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  handleDeleteProductGroup(id: string) {
    this._productGroupsService.deleteProductGroup(id).subscribe({
      next: () => {
        const docId = this.activatedRoute.snapshot.paramMap.get('id');
        if (docId === id) {
          this.router.navigateByUrl('/products-management/product-groups');
        }
        this.message.success('Xóa dữ liệu thành công!');
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
