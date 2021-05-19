import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';

// 정기지출 작성 폼
export interface IRegularExpenditureForm {
  title: string;
  regularDate: number;
  amount: number;
  isAutoExpenditure: boolean;
  category: IAccountBookCategory;
}
