/*
* 가계부 - 지출, 수입 카테고리
* */

import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';

export interface IAccountBookCategory {
  id: number;
  name: string;
  type: AccountBookCategoryType;
  createdAt: Date;
  updatedAt: Date;
}
