import { TransferDirection } from 'ng-zorro-antd/transfer';
import { IProductGroups } from './product-groups.model';
import { ICategory } from './category.model';

export interface IProduct {
  productName: string;
  category: ICategory;
  group: IProductGroups;
  productClassification: IProductClassification[];
  description: string;
  createdDate: string;
  modifiedDate: string;
  id: string;
}

export interface IProductClassification {
  images: string[];
  color: string[];
  price: string;
}

export interface IBestSellerListRes {
  list: IProductTransfer[];
  id: string;
}

export interface IProductTransfer extends IProduct {
  title: string;
}
