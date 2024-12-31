import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentActiveCard: null
};

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    updateCurrentActiveCard: (state, action) => {
      state.currentActiveCard = action.payload;
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null;
    }
  },
  // Handle async data
  extraReducers: () => { }
});

// Action creators are generated for each case reducer function
// dispath() -> update data by reducer
export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions;

// Selectors -> useSelector()
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};

export const activeCardReducer = activeCardSlice.reducer;