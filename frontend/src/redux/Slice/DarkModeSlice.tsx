import { createSlice } from '@reduxjs/toolkit';

interface darkModeslice {
  mode: 'light' | 'dark';
}

const initialState: darkModeslice = {
  mode: 'light',
};

const DarkModeSlice = createSlice({
  name: 'darkmode',
  initialState,
  reducers: {
    switchMode(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { switchMode } = DarkModeSlice.actions;

export default DarkModeSlice.reducer;
