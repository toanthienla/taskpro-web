import axios from 'axios';
import { API_ROOT } from '~/utils/constants';

// Catch error Interceptor after done basic

// Board
export const getBoardApi = async (boarId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boarId}`);
  return response.data;
};
export const putBoardColumnOrderIdsApi = async (boarId, dndKitOrderedColumns) => {
  await axios.put(`${API_ROOT}/v1/boards/${boarId}`, { columnOrderIds: dndKitOrderedColumns });
};


// Column
export const postNewColumnApi = async (column) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, column);
  return response.data;
};
export const putColumnCardOrderIdsApi = async (columnId, dndKitOrderedCards) => {
  await axios.put(`${API_ROOT}/v1/columns`, { columnId, cardOrderIds: dndKitOrderedCards });
};
export const deleteColumnCardOrderIdsApi = async (columnId, cardId) => {
  // Delete RestAPI not have body
  await axios.delete(`${API_ROOT}/v1/columns?columnId=${columnId}&cardId=${cardId}`);
};
export const deleteColumnApi = async (columnId) => {
  // Deletes a column and its associated data. This involves:
  //  - Removing the column ID from the board's `columnOrderIds`.
  //  - Deleting the column document.
  //  - Deleting all cards belonging to the column.
  await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);
};


// Card
export const postNewCardApi = async (card) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, card);
  return response.data;
};
export const putCardColumnId = async (columnId, cardId) => {
  await axios.put(`${API_ROOT}/v1/cards`, { columnId, cardId });
};