import { atom } from 'recoil';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
const PREFIX = 'ACCOUNT_BOOK';


const atoms = {
  // 가계부 카테고리 리스트
  accountBookCategoriesState: atom<IAccountBookCategory[]>({
    key: `${PREFIX}ATOM/regularExpenditureList`,
    default: [],
  }),
};

export default {
  atoms,
};
