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
    editNumber(state, action) {
      const { id, name } = action.payload;
      const numberToEdit = state.savedNumbers.find(
        (number) => number.id === id
      );
      if (numberToEdit) {
        numberToEdit.name = name;
      }
    },
    clearAllNumbers(state) {
      state.savedNumbers = [];
    },
  },
});

export const { addNumber, removeNumber, editNumber, clearAllNumbers } =
  savedNumbersSlice.actions;
export default savedNumbersSlice.reducer;
