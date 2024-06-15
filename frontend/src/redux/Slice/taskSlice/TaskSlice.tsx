import { createSlice } from '@reduxjs/toolkit';
import { TaskApiResponse } from '../../../components/Types';
import { createTask, deleteTask, taskById, updateTask } from './TaskSliceApi';

interface initialStateType {
  task: { task: TaskApiResponse | null };
  error: string;
  loading: boolean;
}

const initialState: initialStateType = {
  task: { task: null },
  error: '',
  loading: false,
};

const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTaskError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    //////////////create task
    builder
      .addCase(createTask.pending, (state) => {
        state.task.task = null;
        state.error = '';
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action: any) => {
        state.task.task = action.payload;
        state.error = '';
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action: any) => {
        state.error = action.payload;
        state.task.task = null;
        state.loading = false;
      })
      //////////////////// task by id
      .addCase(taskById.fulfilled, (state, action: any) => {
        state.task.task = action.payload;
        state.error = '';
        state.loading = false;
      })
      //////////////// delete task
      .addCase(deleteTask.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.error = '';
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.error = '';
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearTaskError } = TaskSlice.actions;

export default TaskSlice.reducer;
