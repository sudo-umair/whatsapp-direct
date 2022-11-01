import { createSlice } from '@reduxjs/toolkit';

type SavedNumberItem = {
  id: string;
  name: string;
  number: string;
};

const initialState: SavedNumberItem[] = [];

const savedNumbersSlice = createSlice({
  name: 'savedNumbers',
  initialState: initialState,
  reducers: {
    addNumber(state, action) {
      state.push(action.payload);
    },
    removeNumber(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    editNumber(state, action) {
      const { id, name } = action.payload;
      const numberToEdit = state.find((number) => number.id === id);
      if (numberToEdit) {
        numberToEdit.name = name;
      }
    },
    clearAllNumbers(state) {
      return initialState;
    },
  },
});

export const { addNumber, removeNumber, editNumber, clearAllNumbers } =
  savedNumbersSlice.actions;
export default savedNumbersSlice.reducer;
