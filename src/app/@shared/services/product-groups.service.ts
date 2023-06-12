import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/@core/base/base.service';
import * as moment from 'moment';
import { Observable, from } from 'rxjs';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { IProductGroups } from 'src/app/@core/models/product-groups.model';

@Injectable({
  providedIn: 'root',
})
export class ProductGroupsService extends BaseService {
  constructor() {
    super();
  }

  createProductGroup(params: IProductGroups) {
    const requestBody: IProductGroups = {
      ...params,
      createdDate: moment(new Date()).format(),
      modifiedDate: moment(new Date()).format(),
    };

    return from(
      addDoc(this.productGroupCollection, <IProductGroups>requestBody)
    );
  }

  getAllProductGroups() {
    return collectionData(this.productGroupCollection, {
      idField: 'id',
    }) as Observable<IProductGroups[]>;
  }

  updateProductGroup(id: string, value: IProductGroups) {
    const docRef = doc(this.firestore, 'product-groups', id);
    const updated: IProductGroups = {
      ...value,
      modifiedDate: moment(new Date()).format(),
    };
    return from(setDoc(docRef, updated));
  }

  getProductGroupById(id: string) {
    const docRef = doc(this.firestore, 'product-groups', id);
    return from(getDoc(docRef));
  }

  deleteProductGroup(id: string) {
    const docRef = doc(this.firestore, 'product-groups', id);
    return from(deleteDoc(docRef));
  }
}
