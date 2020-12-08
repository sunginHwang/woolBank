import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { AsyncState } from '@models/redux';
import { IAccount } from '@models/IAccount';
import { fetchAccount } from '@support/api/accountApi';
import Layout from '@store/modules/Layout';
import { delay } from '@support/util/delay';

const name = 'accountDetail';
// 캐싱 최대 10개까지만
const DETAIL_CACHE_COUNT = 10;

export const getAccount = createAsyncThunk(
  `${name}/getAccount`,
  async ({ accountId, useDelay }: { accountId: number; useDelay: boolean }, { rejectWithValue, dispatch }) => {
    try {
      const accountRes = await fetchAccount(accountId);

      if (useDelay) {
        // ux 로딩용 딜레이
        await delay(400);
      }

      return accountRes.data.data;
    } catch (e) {
      dispatch(Layout.actions.setErrorStatusCode(e.response.data.status));
      return rejectWithValue(e.response.data);
    }
  }
);

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
      const accountCacheList = state.accountDetailCache;

      const account = _.merge(action.payload, {
        startDate: new Date(action.payload.startDate),
        endDate: new Date(action.payload.endDate),
        createdAt: new Date(action.payload.createdAt),
        updatedAt: new Date(action.payload.updatedAt)
      });

      if (account.deposits) {
        account.deposits = account.deposits.map((deposit) => {
          return _.merge(deposit, {
            depositDate: new Date(deposit.depositDate),
            createdAt: new Date(deposit.createdAt),
            updatedAt: new Date(deposit.updatedAt)
          });
        });
      }
      // todo 캐싱 처리 duplicate 나오는 부분 리팩토링 필요.
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
      state.accountDetail.loading = false;
      state.accountDetailCache = accountCacheList;
    },
    [getAccount.rejected.type]: (state, action: PayloadAction<any, any, any, any>) => {
      state.accountDetail.loading = false;
      state.accountDetail.data = null;
      state.accountDetail.error = action.error.message;
    }
  }
});
