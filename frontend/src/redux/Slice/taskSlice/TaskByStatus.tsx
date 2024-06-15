import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TaskType } from '../../../components/Types';
import axios from 'axios';

interface initialStateType {
  tasksByStatus: { [key: string]: TaskType[] };
  loading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  tasksByStatus: {},
  error: '',
  loading: false,
};

//////////////////////////////

export const getTaskByStatus = createAsyncThunk(
  'get/taskByStatus',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios({
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/task/tasks-by-col/${id}`,
        method: 'GET',
        withCredentials: true,
      });

      const tasks = res.data.tasks.reduce(
        (
          acc: { [key: string]: TaskType[] },
          group: { _id: string; tasks: TaskType[] },
        ) => {
          acc[group._id] = group.tasks;
          return acc;
        },
        {},
      );

      return tasks;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const TaskByStatus = createSlice({
  name: 'tasksByStatus',
  initialState,
  reducers: {
    clearTaskError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskByStatus.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getTaskByStatus.fulfilled, (state, action: any) => {
        state.tasksByStatus = action.payload;
        state.error = '';
        state.loading = false;
      })
      .addCase(getTaskByStatus.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default TaskByStatus.reducer;
