import authAxiosInstance from '~/apis/authAxios.js';
import { API_ROOT } from '~/utils/constants';

// Catch error Interceptor after done basic

// Board
export const postNewBoardApi = async (board) => {
  const response = await authAxiosInstance.post(`${API_ROOT}/v1/boards`, board);
  return response.data;
};
export const putBoardColumnOrderIdsApi = async (boarId, dndKitOrderedColumns) => {
  await authAxiosInstance.put(`${API_ROOT}/v1/boards/${boarId}`, { columnOrderIds: dndKitOrderedColumns });
};
export const getBoardsApi = async (page) => {
  const response = await authAxiosInstance.get(`${API_ROOT}/v1/boards?page=${page}`);
  return response.data;
};


// Column
export const postNewColumnApi = async (column) => {
  const response = await authAxiosInstance.post(`${API_ROOT}/v1/columns`, column);
  return response.data;
};
export const updateColumnApi = async (data) => {
  await authAxiosInstance.put(`${API_ROOT}/v1/columns`, data);
};
export const deleteColumnCardOrderIdsApi = async (columnId, cardId) => {
  // Delete RestAPI not have body
  await authAxiosInstance.delete(`${API_ROOT}/v1/columns?columnId=${columnId}&cardId=${cardId}`);
};
export const deleteColumnApi = async (columnId) => {
  // Deletes a column and its associated data. This involves:
  //  - Removing the column ID from the board's `columnOrderIds`.
  //  - Deleting the column document.
  //  - Deleting all cards belonging to the column.
  await authAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`);
};


// Card
export const postNewCardApi = async (card) => {
  const response = await authAxiosInstance.post(`${API_ROOT}/v1/cards`, card);
  return response.data;
};
export const putCardColumnIdApi = async (columnId, cardId) => {
  await authAxiosInstance.put(`${API_ROOT}/v1/cards`, { columnId, cardId });
};

// User
export const postNewUserApi = async (email, password) => {
  const response = await authAxiosInstance.post(`${API_ROOT}/v1/users/register`, { email, password });
  return response.data;
};
export const validateUserApi = async (email, token) => {
  const response = await authAxiosInstance.put(`${API_ROOT}/v1/users/validation`, { email, token });
  return response.data;
};
export const refreshTokenApi = async () => {
  const response = await authAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`);
  return response.data;
};