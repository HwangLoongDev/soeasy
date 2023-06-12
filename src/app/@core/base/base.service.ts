import { inject } from '@angular/core';
import { Firestore, collection, doc } from '@angular/fire/firestore';

export class BaseService {
  firestore: Firestore = inject(Firestore);

  public categoriesCollection = collection(this.firestore, 'categories');
  public productGroupCollection = collection(this.firestore, 'product-groups');
  public newsCollection = collection(this.firestore, 'news');
  public productCollection = collection(this.firestore, 'products');
  public bestSellerCollection = collection(this.firestore, 'best-seller');
  public customersCollection = collection(this.firestore, 'customers');
}
