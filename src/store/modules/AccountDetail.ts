import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../../models/redux';
import { fetchAccount } from '../../support/api/accountApi';
import { IAccount } from '../../models/IAccount';

const name = 'accountDetail';
// 캐싱 최대 10개까지만
const DETAIL_CACHE_COUNT = 10;

export const getAccount = createAsyncThunk(`${name}/getAccount`,
  async (accountId: number) => {
    const accountRes = await fetchAccount(accountId);
    return accountRes.data.data;
  });

export type AccountDetailState = {
  accountDetailList: AsyncState<IAccount[]>,
}

const initialState: AccountDetailState = {
  accountDetailList: {
    loading: false,
    data: []
  }
};

export default createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getAccount.pending.type]: (state) => {
      state.accountDetailList.loading = true;
    },
    [getAccount.fulfilled.type]: (state, action: PayloadAction<IAccount>) => {
      const account = action.payload;
      const accountDetailList = state.accountDetailList.data;
      accountDetailList.push(account);

      if (DETAIL_CACHE_COUNT < accountDetailList.length) {
        accountDetailList.shift();
      }

      state.accountDetailList.data = accountDetailList;
      state.accountDetailList.loading = false;
    },
    [getAccount.rejected.type]: (state) => {
      state.accountDetailList.loading = false;
    }
  }
});
