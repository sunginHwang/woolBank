import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';

// 가계부 작성 폼 타입
export interface IAccountBookSaveForm {
  title: string;
  amount: number;
  memo: string;
  dateTime: Date;
  category: IAccountBookCategory;
  type: AccountBookCategoryType;
}
