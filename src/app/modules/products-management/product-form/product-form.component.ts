import { Component, OnInit } from '@angular/core';
import { addDoc } from '@angular/fire/firestore';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { first, forkJoin, take } from 'rxjs';
import { BaseClass } from 'src/app/@core/base/base.class';
import { ICategory } from 'src/app/@core/models/category.model';
import { IProductGroups } from 'src/app/@core/models/product-groups.model';
import { IProduct } from 'src/app/@core/models/products.model';
import { CategoriesService } from 'src/app/@shared/services/categories.service';
import { ProductGroupsService } from 'src/app/@shared/services/product-groups.service';
import { ProductService } from 'src/app/@shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent extends BaseClass implements OnInit {
  formProduct!: FormGroup;
  categoryOptions: ICategory[] = [];
  productGroupsOptions: IProductGroups[] = [];
  loading: boolean = false;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private message: NzMessageService,
    private _categoriesService: CategoriesService,
    private _productGroupsService: ProductGroupsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      productName: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      productClassification: this.fb.array([
        this.fb.group({
          images: new FormControl([], Validators.required),
          color: new FormControl('', Validators.required),
          price: new FormControl('', Validators.required),
        }),
      ]),
      description: new FormControl(''),
    });

    this.formProduct.get('category')?.valueChanges.subscribe(() => {
      this.formProduct.get('group')?.setValue('');
    });

    const getAllCategories = this._categoriesService
      .getAllCategories()
      .pipe(first());

    const getAllGroups = this._productGroupsService
      .getAllProductGroups()
      .pipe(first());

    forkJoin([getAllCategories, getAllGroups]).subscribe({
      next: (res) => {
        this.categoryOptions = res[0].map((e) => ({ id: e.id, name: e.name }));
        this.productGroupsOptions = res[1].map((e) => ({
          id: e.id,
          category: e.category,
          name: e.name,
        }));
      },
      error: (err) => {
        console.log(err);
        this.message.error('Có lỗi xảy ra!');
      },
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.loading = true;
        this.isUpdate = true;
        const docId = params['id'];
        this._productService.getProductById(docId).subscribe({
          next: (docRef) => {
            const docData = docRef.data() as IProduct;

            this.productClassification.removeAt(0);
            docData.productClassification.map((e) => {
              const formClassification = this.fb.group({
                images: new FormControl(e.images),
                color: new FormControl(e.color),
                price: new FormControl(e.price),
              });
              this.productClassification.push(formClassification);
            });

            this.formProduct.patchValue({
              productName: docData.productName,
              category: docData.category,
              group: docData.group,
              description: docData.description,
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
    });
  }

  get productClassification() {
    return this.formProduct.get('productClassification') as FormArray;
  }

  filterOptionsByCategory() {
    const category = this.formProduct.get('category')?.value;
    if (category) {
      return this.productGroupsOptions.filter(
        (e) => e.category.id === category.id
      );
    } else {
      return this.productGroupsOptions;
    }
  }

  addClassification() {
    const newClassification = this.fb.group({
      images: new FormControl([], Validators.required),
      color: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });

    this.productClassification.push(newClassification);
  }

  copyClassification(index: number) {
    const copiedValue = this.productClassification.at(index).value;

    const newClassification = this.fb.group({
      images: new FormControl(copiedValue.images, Validators.required),
      color: new FormControl(copiedValue.color, Validators.required),
      price: new FormControl(copiedValue.price, Validators.required),
    });

    this.productClassification.push(newClassification);
  }

  deleteClassification(index: number) {
    this.productClassification.removeAt(index);
  }

  receivedImageUrl(fileList: string[], idx: number) {
    this.productClassification.at(idx).patchValue({ images: [...fileList] });
  }

  submitForm() {
    if (this.formProduct.valid) {
      this.loading = true;
      const params = { ...this.formProduct.value };

      if (this.isUpdate) {
        const docId = this.activatedRoute.snapshot.paramMap.get('id');
        this._productService.updateProduct(docId!, params).subscribe({
          next: () => {
            this.message.success('Cập nhật sản phẩm thành công!');
            this.loading = false;
          },
          error: (err) => {
            console.log(err);
            this.message.error('Có lỗi xảy ra!');
            this.loading = false;
          },
        });
      } else {
        this._productService.createProduct(params).subscribe({
          next: (docRef) => {
            this.router.navigateByUrl(
              `/products-management/update/${docRef.id}`
            );
            this.message.success('Thêm sản phẩm thành công!');
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
