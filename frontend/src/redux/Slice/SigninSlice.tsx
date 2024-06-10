import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthReqApiHandler } from '../../components/modals/Auth/AuthReqHandler';

const initialState = {
  currenUser: null,
};

export const signinHandler = createAsyncThunk(
  'user/sigin',
  async (data: any) => {
    const res = AuthReqApiHandler('auth/login', data);
    return res;
  },
);

export const signinUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinHandler.fulfilled, (state, action: any) => {
      state.currenUser = action.payload;
    });
  },
});

export default signinUserSlice.reducer;
