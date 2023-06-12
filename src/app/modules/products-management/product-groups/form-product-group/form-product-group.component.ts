import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseClass } from 'src/app/@core/base/base.class';
import { ICategory } from 'src/app/@core/models/category.model';
import { CategoriesService } from 'src/app/@shared/services/categories.service';
import { ProductGroupsService } from 'src/app/@shared/services/product-groups.service';

@Component({
  selector: 'app-form-product-group',
  templateUrl: './form-product-group.component.html',
  styleUrls: ['./form-product-group.component.scss'],
})
export class FormProductGroupComponent extends BaseClass implements OnInit {
  formProductGroup!: FormGroup;
  categories: ICategory[] = [];
  loading: boolean = false;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _productGroupsService: ProductGroupsService,
    private _categoriesService: CategoriesService,
    private router: Router,
    private message: NzMessageService,
    private activedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.formProductGroup = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.loading = true;
    this._categoriesService.getAllCategories().subscribe({
      next: (collection) => {
        this.categories = collection.map((e) => ({ name: e.name, id: e.id }));
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.message.error('Có lỗi xảy ra!');
        this.loading = false;
      },
    });

    this.activedRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.loading = true;
          this.isUpdate = true;
          const docId = this.activedRoute.snapshot.paramMap.get('id');
          this._productGroupsService.getProductGroupById(docId!).subscribe({
            next: (doc) => {
              const docData = doc.data();
              this.formProductGroup.setValue({
                name: docData!['name'],
                category: docData!['category'],
              });
              this.loading = false;
            },
            error: (err) => {
              console.log(err);
              this.message.error('Có lỗi xảy ra!');
              this.loading = false;
            },
          });
        }
      },
    });
  }

  handleCancel() {
    this.isUpdate = false;
    this.router.navigateByUrl('/products-management/product-groups');
  }

  async handleSubmit() {
    if (this.formProductGroup.valid) {
      this.loading = true;
      if (this.isUpdate) {
        const docId = this.activedRoute.snapshot.paramMap.get('id');
        this._productGroupsService
          .updateProductGroup(docId!, this.formProductGroup.value)
          .subscribe({
            next: () => {
              this.message.success('Cập nhật liệu thành công!');
              this.loading = false;
            },
            error: (err) => {
              console.log(err);
              this.message.error('Có lỗi xảy ra!');
              this.loading = false;
            },
          });
      } else {
        this._productGroupsService
          .createProductGroup(this.formProductGroup.value)
          .subscribe({
            next: (docRef) => {
              this.message.success('Thêm dữ liệu thành công!');
              this.router.navigateByUrl(
                `/products-management/product-groups/${docRef.id}`
              );
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
  }
}
