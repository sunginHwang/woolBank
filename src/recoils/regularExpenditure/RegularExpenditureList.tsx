import { atom, selector } from 'recoil';

import useRecoilTrigger from '@support/hooks/useRecoilTrigger';
import { fetchRegularExpenditureList } from '@support/api/regularExpenditureApi';

const PREFIX = 'REGULAR_EXPENDITURE/LIST/';

const selectors = {
  regularExpenditureApiListState: selector({
    key: `${PREFIX}listState`,
    get: async ({ get }) => {
      get(atoms.regularExpenditureApiListTriggerState);
      const res = await fetchRegularExpenditureList();
      return res.data.data;
    }
  })
};

const atoms = {
  regularExpenditureListState: atom({
    key: `${PREFIX}ATOM/regularExpenditureList`,
    default: selectors.regularExpenditureApiListState
  }),
  regularExpenditureApiListTriggerState: atom({
    key: `${PREFIX}ATOM/regularExpenditureApiListTriggerState`,
    default: 0
  })
};

export default {
  atoms,
  selectors
};
