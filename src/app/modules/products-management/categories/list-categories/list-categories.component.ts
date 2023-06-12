import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ICategory } from 'src/app/@core/models/category.model';
import { CategoriesService } from 'src/app/@shared/services/categories.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit {
  collection: ICategory[] = [];
  loading: boolean = false;

  constructor(
    private _categoriesService: CategoriesService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.loading = true;
    this._categoriesService.getAllCategories().subscribe({
      next: (collection) => {
        this.collection = collection;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  handleDeleteCategory(id: string) {
    this._categoriesService.deleteCategory(id).subscribe({
      next: () => {
        const docId = this.activatedRoute.snapshot.paramMap.get('id');
        if (docId === id) {
          this.router.navigateByUrl('/products-management/categories');
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
