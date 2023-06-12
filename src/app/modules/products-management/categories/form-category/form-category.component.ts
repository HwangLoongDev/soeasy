import { Component, OnInit, SimpleChanges } from '@angular/core';
import { addDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseClass } from 'src/app/@core/base/base.class';
import { CategoriesService } from 'src/app/@shared/services/categories.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent extends BaseClass implements OnInit {
  formCategory!: FormGroup;
  loading: boolean = false;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _categoriesService: CategoriesService,
    private router: Router,
    private message: NzMessageService,
    private activedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.formCategory = this.fb.group({
      name: ['', Validators.required],
    });

    this.activedRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.loading = true;
          this.isUpdate = true;
          const docId = this.activedRoute.snapshot.paramMap.get('id');
          this._categoriesService.getCategoryById(docId!).subscribe({
            next: (doc) => {
              const docData = doc.data();
              this.formCategory.setValue({ name: docData!['name'] });
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
    this.router.navigateByUrl('/products-management/categories');
  }

  async handleSubmit() {
    if (this.formCategory.valid) {
      this.loading = true;
      if (this.isUpdate) {
        const docId = this.activedRoute.snapshot.paramMap.get('id');
        this._categoriesService
          .updateCategory(docId!, this.formCategory.value)
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
        this._categoriesService
          .createCategory(this.formCategory.value)
          .subscribe({
            next: (docRef) => {
              this.message.success('Thêm dữ liệu thành công!');
              this.router.navigateByUrl(
                `/products-management/categories/${docRef.id}`
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
