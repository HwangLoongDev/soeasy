import { compareByIdFunc } from '../utils/common-functions';
import { BaseService } from './base.service';

export class BaseClass extends BaseService {
  value: any = 1234567.55;
  formatter = (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  parser = (value: string) => value.replace(/\$\s?|(,*)/g, '');
  compareById = compareByIdFunc;
}
