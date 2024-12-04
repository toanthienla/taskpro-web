import axios from 'axios';
import { API_ROOT } from '~/utils/constants';

// Catch error Interceptor after done basic
export const getBoard = async (boarId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boarId}`);
  return response.data;
};