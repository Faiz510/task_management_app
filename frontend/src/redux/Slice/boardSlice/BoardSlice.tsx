import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAction,
} from '@reduxjs/toolkit';
import { boadApiSliceHandler } from './BoardSliceApi';
import { BoardType, BoardTypeApiResponse } from '../../../components/Types';

interface initialStateType {
  Board: BoardTypeApiResponse;
  error: string;
}

const initialState: initialStateType = {
  Board: { boards: [] },
  error: '',
};

export const getBoard = createAsyncThunk(
  'board/get',
  async (_, { rejectWithValue }) => {
    try {
      return await boadApiSliceHandler({
        method: 'GET',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/board/user/cur-user`,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteBoard = createAsyncThunk(
  'board/delete',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const res = await boadApiSliceHandler({
        method: 'DELETE',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/board/${id}`,
      });
      dispatch(getBoard());
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createBoard = createAsyncThunk(
  'board/create',
  async (data: BoardType | null, { dispatch, rejectWithValue }) => {
    try {
      const res = await boadApiSliceHandler({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/board`,
        data,
      });
      dispatch(getBoard());
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface EditBoardType {
  id: string;
  data: BoardType | null;
}

export const EditBoard = createAsyncThunk(
  'board/edit',
  async ({ id, data }: EditBoardType, { dispatch, rejectWithValue }) => {
    try {
      const res = await boadApiSliceHandler({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/board/${id}`,
        data,
      });
      dispatch(getBoard());
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const BoardSlice = createSlice({
  name: 'Board',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.fulfilled, (state, action: any) => {
        state.Board.boards = [...state.Board.boards, action.payload];
        state.error = '';
      })
      .addCase(createBoard.rejected, (state, action: any) => {
        state.Board.boards = [];
        state.error = action.payload;
      })
      .addCase(getBoard.fulfilled, (state, action: any) => {
        state.Board = action.payload;
      })
      .addCase(getBoard.rejected, (state, action: any) => {
        state.Board = action.payload;
      })
      .addCase(deleteBoard.fulfilled, (state, action: any) => {
        state.Board = action.payload;
        state.error = '';
      })
      .addCase(deleteBoard.rejected, (state, action: any) => {
        state.error = action.payload;
      })
      .addCase(EditBoard.fulfilled, (state, action: any) => {
        state.Board = action.payload;
        state.error = '';
      })
      .addCase(EditBoard.rejected, (state, action: any) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = BoardSlice.actions;

export default BoardSlice.reducer;
