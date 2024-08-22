import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthReqApiHandler } from '../../components/modals/Auth/AuthReqHandler';
interface UserState {
  currentUser: any | null;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
};

export const signinHandler = createAsyncThunk(
  'user/sigin',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await AuthReqApiHandler('auth/login', data);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const signinUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = initialState.currentUser;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinHandler.fulfilled, (state, action: any) => {
      state.currentUser = action.payload;
      state.error = null;
    });
    builder.addCase(signinHandler.rejected, (state, action: any) => {
      state.currentUser = null;
      state.error = action.payload;
    });
  },
});

export const { logout } = signinUserSlice.actions;
export default signinUserSlice.reducer;
