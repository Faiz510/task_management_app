import { createSlice } from '@reduxjs/toolkit';
import {
  createSubtask,
  deleteSubtask,
  getSubtask,
  getSubtaskById,
  updateActiveStatus,
  updateSubtaskByIds,
} from './SubtaskApiSlice';
import { SubtaskApiResponse } from '../../../components/Types';

interface initialStateType {
  error: string;
  subtask: { subtask: SubtaskApiResponse | null };
  loading: boolean;
}

const initialState: initialStateType = {
  error: '',
  subtask: { subtask: null },
  loading: false,
};

const subTaskSlice = createSlice({
  name: 'subtask',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createSubtask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubtask.fulfilled, (state) => {
        (state.loading = false), (state.error = '');
      })
      .addCase(createSubtask.rejected, (state, action: any) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(getSubtask.fulfilled, (state) => {
        (state.loading = false), (state.error = '');
      })
      .addCase(getSubtaskById.fulfilled, (state) => {
        (state.loading = false), (state.error = '');
      })
      .addCase(updateActiveStatus.fulfilled, (state) => {
        (state.loading = false), (state.error = '');
      })
      .addCase(updateSubtaskByIds.fulfilled, (state) => {
        (state.loading = false), (state.error = '');
      })
      .addCase(deleteSubtask.fulfilled, (state) => {
        (state.loading = false), (state.error = '');
      });
  },
});

export default subTaskSlice.reducer;
