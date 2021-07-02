import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';

export interface IAccountBookStatisticFilter {
  startDate: Date;
  endDate: Date;
  type: AccountBookCategoryType;
}

