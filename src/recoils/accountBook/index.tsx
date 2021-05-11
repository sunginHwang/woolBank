import { atom } from 'recoil';
import { CategoryList } from './dummy';
const PREFIX = 'ACCOUNT_BOOK';


const atoms = {
  // 가계부 카테고리 리스트
  accountBookCategoriesState: atom({
    key: `${PREFIX}ATOM/regularExpenditureList`,
    default: CategoryList
  }),
};

export default {
  atoms,
};
