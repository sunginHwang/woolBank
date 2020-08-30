import reducer from './modules';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { TodoState } from './modules/todo';
import { AuthState } from './modules/Auth';
import { LayoutState } from './modules/Layout';
import { AccountListState } from './modules/AccountList';

const initStore = () => {
  return configureStore({
    reducer,
    middleware: [thunk]
  });
};

export type RootState = {
  todo: TodoState;
  Auth: AuthState;
  Layout: LayoutState;
  AccountList: AccountListState;
};

export default initStore;
