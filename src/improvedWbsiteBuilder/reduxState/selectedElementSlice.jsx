import { createSlice } from '@reduxjs/toolkit';
import { getComponentElements } from '../lib/componentService';

export const selectedElementSlice = createSlice({
  name: 'selectedElement',
  initialState: null,
  reducers: {
    setSelectedElement: (state, action) => {
      // If action.payload is a component type, get its full data
      if (typeof action.payload === 'string') {
        return {
          type: action.payload,
          elements: getComponentElements(action.payload),
        };
      }
      return action.payload;
    },
  },
});

export const { setSelectedElement } = selectedElementSlice.actions;
export default selectedElementSlice.reducer;
