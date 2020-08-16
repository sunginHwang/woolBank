import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILayoutLoading } from '../../models/layout/ILayoutLoading';

const name = 'layout';

export type LayoutState = {
  loading:ILayoutLoading,
}

const initialState: LayoutState = {
  loading: {
    isLoading: false,
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
    }
  }
})
