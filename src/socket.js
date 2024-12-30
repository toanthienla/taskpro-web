// // Socket.io client
import { API_ROOT } from '~/utils/constants.js';
import { io } from 'socket.io-client';
export const socket = io(API_ROOT);