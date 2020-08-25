import reducer from './modules';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { TodoState } from './modules/todo';
import { AuthState } from './modules/Auth';
import { LayoutState } from './modules/Layout';

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
};

export default initStore;
