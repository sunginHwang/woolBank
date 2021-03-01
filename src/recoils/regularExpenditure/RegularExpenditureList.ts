import { atom, selector } from 'recoil';
import { fetchRegularExpenditureList } from '@support/api/regularExpenditureApi';

const PREFIX = 'REGULAR_EXPENDITURE/LIST/';

const selectors = {
  regularExpenditureApiList: selector({
    key: `${PREFIX}listState`,
    get: async () => {
      const res = await fetchRegularExpenditureList();
      return res.data.data;
    }
  })
};

const atoms = {
  regularExpenditureList: atom({
    key: `${PREFIX}ATOM/regularExpenditureList`,
    default: selectors.regularExpenditureApiList
  })
};

export default {
  atoms,
  selectors
};
