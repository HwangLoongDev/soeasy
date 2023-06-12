import { Injectable } from '@angular/core';
import { collectionData, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { BaseService } from 'src/app/@core/base/base.service';
import { ICusomter } from 'src/app/@core/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends BaseService {
  constructor() {
    super();
  }

  getAllCustomers() {
    return from(
      collectionData(this.customersCollection) as Observable<ICusomter[]>
    );
  }
}
