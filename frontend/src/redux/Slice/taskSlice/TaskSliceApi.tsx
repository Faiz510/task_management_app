import { createAsyncThunk } from '@reduxjs/toolkit';
import { SliceApiHanlder } from '../SliceApiHandler';
import { getTaskByStatus } from './TaskByStatus';
import { TaskApiResponse } from '../../../components/Types';

export const createTask = createAsyncThunk(
  'task/create',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const res: TaskApiResponse = await SliceApiHanlder({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/task`,
        data: data,
      });
      // console.log(res);
      dispatch(getTaskByStatus(res.task.board));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const taskById = createAsyncThunk(
  'task/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await SliceApiHanlder({
        method: 'GET',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/task/${id}`,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'task/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: TaskApiResponse = await SliceApiHanlder({
        method: 'DELETE',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/task/${id}`,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface updateTaskType {
  id: string;
  data: any;
}

export const updateTask = createAsyncThunk(
  'task/update',
  async ({ id, data }: updateTaskType, { rejectWithValue }) => {
    try {
      const res: TaskApiResponse = await SliceApiHanlder({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/task/${id}`,
        data: data,
      });
      console.log(res);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
