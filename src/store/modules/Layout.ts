import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILayoutLoading } from '../../models/layout/ILayoutLoading';
import { IToast } from '../../models/layout/IToast';

const name = 'layout';

export type LayoutState = {
  loading: ILayoutLoading;
  toast: IToast;
};

const initialState: LayoutState = {
  loading: {
    isLoading: false,
    message: ''
  },
  toast: {
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
    hideLoading: (state) => {
      state.loading.isLoading = false;
      state.loading.message = '';
    },
    showToast: (state, action: PayloadAction<string>) => {
      state.toast.isShow = true;
      state.toast.message = action.payload;
    },
    hideToast: (state) => {
      state.toast.isShow = false;
      state.toast.message = '';
    }
  }
});
