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
  reducers: {
    removeAccountDetail: (state, action: PayloadAction<number>) => {
      state.accountDetail.data = null;

      // 해당 요소 캐시 삭제
      const accountCacheList = state.accountDetailCache;
      const removeIndex = accountCacheList.findIndex((a) => a.id === action.payload);
      accountCacheList.splice(removeIndex, 1);
      state.accountDetailCache = accountCacheList;
    },
    setAccountDetail: (state, action: PayloadAction<IAccount>) => {
      state.accountDetail.data = action.payload;
    },
    clearAccountDetail: (state) => {
      state.accountDetail.data = null;
    }
  },
  extraReducers: {
    [getAccount.pending.type]: (state) => {
      state.accountDetail.loading = true;
    },
    [getAccount.fulfilled.type]: (state, action: PayloadAction<IAccount>) => {
      const account = action.payload;
      const accountCacheList = state.accountDetailCache;

      const accountCacheIndex = accountCacheList.findIndex((a) => a.id === account.id);

      if (accountCacheIndex > -1) {
        accountCacheList[accountCacheIndex] = account;
      } else {
        accountCacheList.push(account);
      }

      if (DETAIL_CACHE_COUNT < accountCacheList.length) {
        accountCacheList.shift();
      }

      state.accountDetail.data = account;
      state.accountDetailCache = accountCacheList;
      state.accountDetail.loading = false;
    },
    [getAccount.rejected.type]: (state, action: PayloadAction<any, any, any, any>) => {
      state.accountDetail.loading = false;
      state.accountDetail.data = null;
      state.accountDetail.error = action.error.message;
    }
  }
});
