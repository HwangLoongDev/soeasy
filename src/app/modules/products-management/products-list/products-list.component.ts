import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/@core/models/products.model';
import { ProductService } from 'src/app/@shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  collection: IProduct[] = [];
  loading: boolean = false;

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.loading = true;
    this._productService.getAllProducts().subscribe({
      next: (collection) => {
        console.log(collection);
        this.collection = collection;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  handleDeleteProduct(id: string) {

  }
}
