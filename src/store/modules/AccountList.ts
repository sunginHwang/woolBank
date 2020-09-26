import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IAccount } from '@models/IAccount';
import { AsyncState } from '@models/redux';
import { fetchAccountList } from '@support/api/accountApi';

const name = 'accounts';

export const getAccountList = createAsyncThunk(`${name}/getAccounts`,
  async () => {
    const accountList = await fetchAccountList();
    return accountList.data.data;
  });

export type AccountListState = {
  accountList: AsyncState<IAccount[]>,
  lastUpdatedDate: null | Date; // 리스트중 가장 마지막 업데이트된 Account 시각 (캐싱용)
}

const initialState: AccountListState = {
  accountList: {
    loading: false,
    data: []
  },
  lastUpdatedDate: null
};

export default createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getAccountList.pending.type]: (state) => {
      state.accountList.loading = true;
    },
    [getAccountList.fulfilled.type]: (state, action: PayloadAction<IAccount[]>) => {
      const accountList = action.payload;
      state.accountList.loading = false;
      state.accountList.data = accountList;

      // 리스트 존재시 가장 최신 업데이트된 시간 설정 (다시 조회시 캐시 체크 용)
      if (accountList.length > 0) {
        const lastUpdatedAccount = accountList.sort((a, b) => {
          return (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt)).getTime();
        })[0];

        state.lastUpdatedDate = new Date(lastUpdatedAccount.updatedAt);
      }
    },
    [getAccountList.rejected.type]: (state) => {
      state.accountList.loading = false;
    }
  }
});
