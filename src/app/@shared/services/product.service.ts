import { Injectable } from '@angular/core';
import {
  DocumentSnapshot,
  addDoc,
  collectionData,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable, from } from 'rxjs';
import { BaseService } from 'src/app/@core/base/base.service';
import {
  IBestSellerListRes,
  IProduct,
  IProductTransfer,
} from 'src/app/@core/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  getAllProducts(): Observable<IProduct[]> {
    return collectionData(this.productCollection, {
      idField: 'id',
    }) as Observable<IProduct[]>;
  }

  getBestSellerList(): Observable<IBestSellerListRes[]> {
    return collectionData(this.bestSellerCollection, {
      idField: 'id',
    }) as Observable<IBestSellerListRes[]>;
  }

  createProduct(params: IProduct) {
    const requestBody: IProduct = {
      ...params,
      createdDate: moment(new Date()).format(),
      modifiedDate: moment(new Date()).format(),
    };

    return from(addDoc(this.productCollection, <IProduct>requestBody));
  }

  getProductById(id: string) {
    const docRef = doc(this.firestore, 'products', id);

    return from(getDoc(docRef));
  }

  updateProduct(id: string, params: IProduct) {
    const docRef = doc(this.firestore, 'products', id);
    const updated: IProduct = {
      ...params,
      modifiedDate: moment(new Date()).format(),
    };
    return from(setDoc(docRef, updated));
  }
}
