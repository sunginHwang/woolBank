import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@models/IUser';

const name = 'auth';

export type AuthState = {
  user: IUser
}

const initialState: AuthState = {
  user: {
    id: 0,
    name: '',
    email: '',
    imageUrl: ''
  }
};

export default createSlice({
  name,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    }
  }
})
