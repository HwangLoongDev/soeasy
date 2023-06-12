import { ICategory } from './category.model';

export interface IProductGroups {
  id?: string;
  name: string;
  category: ICategory;
  createdDate?: string;
  modifiedDate?: string;
}
