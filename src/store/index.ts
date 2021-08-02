import reducer from './modules';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { AuthState } from '@store/modules/Auth';
import { LayoutState } from '@store/modules/Layout';
import { AccountDetailState } from '@store/modules/AccountDetail';
import { BucketListState } from '@store//modules/BucketList';

const initStore = () => {
  return configureStore({
    reducer,
    middleware: [thunk]
  });
};

export type RootState = {
  Auth: AuthState;
  Layout: LayoutState;
  AccountDetail: AccountDetailState;
  BucketList: BucketListState;
};

export default initStore;
