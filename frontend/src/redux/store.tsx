import { combineReducers, configureStore } from '@reduxjs/toolkit';
import signinUserSlice from './Slice/SigninSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import DarkModeSlice from './Slice/DarkModeSlice';
import BoardSlice from './Slice/boardSlice/BoardSlice';
import curBoardSlice from './Slice/boardSlice/curBoardSlice';
import TaskSlice from './Slice/taskSlice/TaskSlice';
import TaskByStatus from './Slice/taskSlice/TaskByStatus';
import SubTaskSlice from './Slice/subTask/SubTaskSlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const reducers = combineReducers({
  user: signinUserSlice,
  switchMode: DarkModeSlice,
  board: BoardSlice,
  curBoardSlice,
  TaskSlice,
  TaskByStatus,
  SubTaskSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
