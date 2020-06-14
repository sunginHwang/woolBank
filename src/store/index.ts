import reducer from './modules';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { TodoState } from './modules/todo';


const initStore = () => {
  return configureStore({
    reducer,
    middleware: [thunk]
  });
};

export type RootState = {
  todo: TodoState;
};

export default initStore;