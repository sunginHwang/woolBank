import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILayoutLoading } from '../../models/layout/ILayoutLoading';
import { INotification } from '../../models/layout/INotification';

const name = 'layout';

export type LayoutState = {
  loading: ILayoutLoading;
  notification: INotification;
};

const initialState: LayoutState = {
  loading: {
    isLoading: false,
    message: ''
  },
  notification: {
    isShow: false,
    message: ''
  }
};

export default createSlice({
  name,
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<string>) => {
      state.loading.isLoading = true;
      state.loading.message = action.payload;
    },
    showNotification: (state, action: PayloadAction<string>) => {
      state.notification.isShow = true;
      state.notification.message = action.payload;
    },
    hideNotification: (state) => {
      state.notification.isShow = false;
      state.notification.message = '';
    },
    hideLoading: (state) => {
      state.loading.isLoading = false;
      state.loading.message = '';
    }
  }
});
