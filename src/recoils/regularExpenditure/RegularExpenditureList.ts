import { selector } from 'recoil';
import { fetchRegularExpenditureList } from '@support/api/regularExpenditureApi';

const PREFIX = 'REGULAR_EXPENDITURE/LIST/';

const selectors = {
  personState: selector({
    key: `${PREFIX}listState`,
    get: async () => {
      const res = await fetchRegularExpenditureList();
      return res.data.data;
    }
  })
};

export default {
  selectors
};
