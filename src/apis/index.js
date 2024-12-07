import axios from 'axios';
import { API_ROOT } from '~/utils/constants';

// Catch error Interceptor after done basic

// Board
export const getBoardApi = async (boarId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boarId}`);
  return response.data;
};
export const putBoardColumnOrderIdsAPI = async (boarId, dndKitOrderedColumns) => {
  await axios.put(`${API_ROOT}/v1/boards/${boarId}`, { columnOrderIds: dndKitOrderedColumns });
};


// Column
export const postNewColumnApi = async (column) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, column);
  return response.data;
};

// Card
export const postNewCardApi = async (card) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, card);
  return response.data;
};