import { atom } from 'recoil';
import { format } from 'date-fns';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';

const PREFIX = 'ACCOUNT_BOOK';

const atoms = {
  // 가계부 리스트 날짜
  listDateState: atom({
    key: `${PREFIX}ATOM/listDateState`,
    default: format(new Date(), 'yyyy-MM')
  }),
  // 가계부 카테고리 리스트
  accountBookCategoriesState: atom<IAccountBookCategory[]>({
    key: `${PREFIX}ATOM/accountBookCategoriesState`,
    default: []
  })
};

export default {
  atoms
};
