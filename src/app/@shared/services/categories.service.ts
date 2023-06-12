import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/@core/base/base.service';
import { ICategory } from 'src/app/@core/models/category.model';
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

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  constructor() {
    super();
  }

  createCategory(params: ICategory) {
    const requestBody: ICategory = {
      ...params,
      createdDate: moment(new Date()).format(),
      modifiedDate: moment(new Date()).format(),
    };

    return from(addDoc(this.categoriesCollection, <ICategory>requestBody));
  }

  getAllCategories() {
    return collectionData(this.categoriesCollection, {
      idField: 'id',
    }) as Observable<ICategory[]>;
  }

  updateCategory(id: string, value: ICategory) {
    const docRef = doc(this.firestore, 'categories', id);
    const updated: ICategory = {
      ...value,
      modifiedDate: moment(new Date()).format(),
    };
    return from(setDoc(docRef, updated));
  }

  getCategoryById(id: string) {
    const docRef = doc(this.firestore, 'categories', id);
    return from(getDoc(docRef));
  }

  deleteCategory(id: string) {
    const docRef = doc(this.firestore, 'categories', id);
    return from(deleteDoc(docRef));
  }
}
