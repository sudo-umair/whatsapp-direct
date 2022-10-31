import { createSlice } from '@reduxjs/toolkit';
import SavedNumbers from '../screens/SavedNumbers';

type SavedNumbers = {
  id: string;
  name: string;
  number: string;
};

export type SavedNumbersState = {
  savedNumbers: SavedNumbers[];
};

const initialState: SavedNumbersState = {
  savedNumbers: [],
};

const savedNumbersSlice = createSlice({
  name: 'savedNumbers',
  initialState: initialState,
  reducers: {
    addNumber(state, action) {
      state.savedNumbers.push(action.payload);
    },
    removeNumber(state, action) {
      state.savedNumbers = state.savedNumbers.filter(
        (number) => number.id !== action.payload
      );
    },
    clearAllNumbers(state) {
      state.savedNumbers = [];
    },
  },
});

export const { addNumber, removeNumber, clearAllNumbers } =
  savedNumbersSlice.actions;
export default savedNumbersSlice.reducer;
