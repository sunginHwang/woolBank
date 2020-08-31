import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../../models/redux';
import { fetchAccount } from '../../support/api/accountApi';
import { IAccount } from '../../models/IAccount';

const name = 'accountDetail';
// 캐싱 최대 10개까지만
const DETAIL_CACHE_COUNT = 10;

export const getAccount = createAsyncThunk(`${name}/getAccount`, async (accountId: number) => {
  const accountRes = await fetchAccount(accountId);
  return accountRes.data.data;
});

export type AccountDetailState = {
  accountDetail: AsyncState<null | IAccount>;
  accountDetailCache: IAccount[];
};

const initialState: AccountDetailState = {
  accountDetail: {
    loading: false,
    data: null
  },
  accountDetailCache: []
};

export default createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getAccount.pending.type]: (state) => {
      state.accountDetail.loading = true;
    },
    [getAccount.fulfilled.type]: (state, action: PayloadAction<IAccount>) => {
      const account = action.payload;
      const AccountCacheList = state.accountDetailCache;

      const accountCacheIndex = AccountCacheList.findIndex((a) => a.id === account.id);

      if (accountCacheIndex > -1) {
        AccountCacheList[accountCacheIndex] = account;
      } else {
        AccountCacheList.push(account);
      }

      if (DETAIL_CACHE_COUNT < AccountCacheList.length) {
        AccountCacheList.shift();
      }

      state.accountDetail.data = account;
      state.accountDetailCache = AccountCacheList;
      state.accountDetail.loading = false;
    },
    [getAccount.rejected.type]: (state) => {
      state.accountDetail.loading = false;
    }
  }
});
