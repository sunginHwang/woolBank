import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';

// 가계부 작성 폼 타입
export interface IAccountBookSaveForm {
  id?: number;
  title: string;
  amount: number;
  memo: string;
  registerDateTime: Date;
  category: IAccountBookCategory;
  type: AccountBookCategoryType;
}
