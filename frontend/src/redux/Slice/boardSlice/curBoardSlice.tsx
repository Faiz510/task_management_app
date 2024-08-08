import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { boadApiSliceHandler } from './BoardSliceApi';
import { curBoardApiResponse } from '../../../components/Types';

interface initialStateType {
  curBoard: { curboard: curBoardApiResponse | null };
  error: string;
  loading: boolean;
}

const initialState: initialStateType = {
  curBoard: { curboard: null },
  error: '',
  loading: false,
};

export const getCurBoard = createAsyncThunk(
  'board/curBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await boadApiSliceHandler<null, curBoardApiResponse>({
        method: 'GET',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/board/${id}`,
      });
      console.log();

      return res;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || 'Failed to fetch the board',
      );
    }
  },
);

const curBoardSlice = createSlice({
  name: 'curBoard',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
    clearState(state) {
      state.curBoard.curboard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCurBoard.fulfilled,
        (state, action: PayloadAction<curBoardApiResponse>) => {
          state.curBoard.curboard = action.payload;
          state.error = '';
          state.loading = false;
        },
      )
      .addCase(getCurBoard.pending, (state) => {
        state.curBoard.curboard = null;
        state.error = '';
        state.loading = true;
      })
      .addCase(getCurBoard.rejected, (state, action: any) => {
        state.curBoard.curboard = null;
        state.error = action.payload || 'Failed to fetch the board';
        state.loading = false;
      });
  },
});

export const { clearError, clearState } = curBoardSlice.actions;

export default curBoardSlice.reducer;
