import { createSlice } from '@reduxjs/toolkit';

export type userSettings = {
  colorScheme: 'light' | 'dark';
};

export type userState = {
  userSettings: userSettings;
};

const initialState: userState = {
  userSettings: {
    colorScheme: 'light',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    toggleMode(state, action) {
      state.userSettings.colorScheme = action.payload;
    },
  },
});

export const { toggleMode } = userSlice.actions;
export default userSlice.reducer;
