import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAxiosInstance from '~/apis/authAxios.js';
import { API_ROOT } from '~/utils/constants';
import { isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sorts';

const initialState = {
  currentActiveBoard: null
};

// Async function when call API
export const getBoardApi = createAsyncThunk(
  'activeBoard/getBoardApi',
  async (boardId) => {
    const response = await authAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`);
    return response.data;
  }
);

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      let board = action.payload;

      // Perform logic here
      // ...

      state.currentActiveBoard = board;
    }
  },
  // Handle async data
  extraReducers: (builder) => {
    builder.addCase(getBoardApi.fulfilled, (state, action) => {
      // fulfilled is when promise is success
      // action.payload is return reponse data
      const board = action.payload;

      // Sort column by columnOrderIds
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id');

      board.columns.forEach(column => {
        // Add placeholder card if column have empty cards array
        if (isEmpty(column?.cards)) {
          const placeholderCard = generatePlaceholderCard(column);
          column.cardOrderIds.push(placeholderCard._id);
          column.cards.push(placeholderCard);
        } else {
          // Sort card by cardOrderIds
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
        }
      });

      state.currentActiveBoard = board;
    });
  }
});

// Action creators are generated for each case reducer function
// dispath() -> update data by reducer
export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

// Selectors -> useSelector()
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

export const activeBoardReducer = activeBoardSlice.reducer;