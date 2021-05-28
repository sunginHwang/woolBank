import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';

export interface IAccountBookListItem {
  id: number;
  title: string;
  categoryName: string;
  type: AccountBookCategoryType;
  isRegularExpenditure: boolean;
  amount: number;
  registerDateTime: Date;
}
