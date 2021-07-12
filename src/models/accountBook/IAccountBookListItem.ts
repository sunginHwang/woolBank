import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';

export interface IAccountBookListItem {
  id: number;
  title: string;
  category: IAccountBookCategory;
  type: AccountBookCategoryType;
  isRegularExpenditure: boolean;
  amount: number;
  memo?: string;
  registerDateTime: Date;
}
