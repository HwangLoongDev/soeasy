import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  collectionData,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { BaseService } from 'src/app/@core/base/base.service';
import { INews } from 'src/app/@core/models/news.model';
import * as moment from 'moment';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NewsEventsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getAllNews(): Observable<INews[]> {
    return collectionData(this.newsCollection, { idField: 'id' }) as Observable<
      INews[]
    >;
  }

  getNewsById(id: string) {
    const docRef = doc(this.firestore, 'news', id);
    return from(getDoc(docRef));
  }

  updateNewsById(id: string, params: INews) {
    const docRef = doc(this.firestore, 'news', id);
    const updated: INews = {
      ...params,
      modifiedDate: moment(new Date()).format(),
    };
    return from(setDoc(docRef, updated));
  }

  createNews(params: INews) {
    const requestBody: INews = {
      ...params,
      createdDate: moment(new Date()).format(),
      modifiedDate: moment(new Date()).format(),
    };
    return from(addDoc(this.newsCollection, <INews>requestBody));
  }
}
