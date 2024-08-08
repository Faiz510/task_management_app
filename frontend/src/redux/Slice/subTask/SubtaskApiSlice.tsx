import { createAsyncThunk } from '@reduxjs/toolkit';
import { SliceApiHanlder } from '../SliceApiHandler';
import { SubtaskReqObj, SubtaskType } from '../../../components/Types';

interface createThankType {
  id: string;
  data: SubtaskReqObj;
}

export const getSubtask = createAsyncThunk(
  'get/subtask',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = SliceApiHanlder({
        method: 'GET',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/sub-task/${id}`,
      });
      return res;
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const createSubtask = createAsyncThunk(
  'create/subtask',
  async ({ id, data }: createThankType, { dispatch, rejectWithValue }) => {
    try {
      const res = SliceApiHanlder({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/sub-task/task/${id}`,
        data: data,
      });
      dispatch(getSubtask(id));
      return res;
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const getSubtaskById = createAsyncThunk(
  'getById/subtask',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = SliceApiHanlder({
        method: 'GET',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/sub-task/${id}`,
      });
      return res;
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

interface updateActiveStatusType {
  id: string;
  data: { isActive: boolean };
}

export const updateActiveStatus = createAsyncThunk(
  'updateActive/subtask',
  async (
    { id, data }: updateActiveStatusType,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const res = SliceApiHanlder({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/sub-task/${id}`,
        data: data,
      });
      // dispatch(getSubtask(id));
      dispatch(getSubtaskById(id));
      return res;
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const updateSubtaskByIds = createAsyncThunk(
  'updateByIds/subtask',
  async (subtasks: SubtaskType[], { rejectWithValue }) => {
    try {
      const res = SliceApiHanlder({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/sub-task/task/updatetaskByIds`,
        data: { subtasks },
      });
      return res;
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const deleteSubtask = createAsyncThunk(
  'delete/subtask',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = SliceApiHanlder({
        method: 'DELETE',
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/sub-task/${id}`,
      });
      return res;
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);
