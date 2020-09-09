import reducer from './modules';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { AuthState } from './modules/Auth';
import { LayoutState } from './modules/Layout';
import { AccountListState } from './modules/AccountList';
import { AccountDetailState } from './modules/AccountDetail';
import { BucketListState } from './modules/BucketList';

const initStore = () => {
  return configureStore({
    reducer,
    middleware: [thunk]
  });
};

export type RootState = {
  Auth: AuthState;
  Layout: LayoutState;
  AccountList: AccountListState;
  AccountDetail: AccountDetailState;
  BucketList: BucketListState;
};

export default initStore;
