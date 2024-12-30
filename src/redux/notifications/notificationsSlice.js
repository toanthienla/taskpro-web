import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAxiosInstance from '~/apis/authAxios.js';
import { API_ROOT } from '~/utils/constants';

const initialState = {
  currentNotifications: null
};

export const getInvitationsApi = createAsyncThunk(
  'notifications/getInvitationsApi',
  async () => {
    const response = await authAxiosInstance.get(`${API_ROOT}/v1/invitations`);
    return response.data;
  }
);

export const updateBoardInvitationApi = createAsyncThunk(
  'notifications/updateBoardInvitationApi',
  async (data) => {
    const response = await authAxiosInstance.put(`${API_ROOT}/v1/invitations/board`, data);
    return response.data;
  }
);


export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null;
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload;
    },
    addNotification: (state, action) => {
      state.currentNotifications.unshift(action.payload);
    }
  },
  // Handle async data
  extraReducers: (builder) => {
    builder.addCase(getInvitationsApi.fulfilled, (state, action) => {
      state.currentNotifications = action.payload;
    });
    builder.addCase(updateBoardInvitationApi.fulfilled, (state, action) => {
      const updateNotification = state.currentNotifications.find((notification) => notification._id === action.payload._id);
      updateNotification.boardInvitation.status = action.payload.boardInvitation.status;
    });
  }
});

export const { clearCurrentNotifications, updateCurrentNotifications, addNotification } = notificationsSlice.actions;

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications;
};

export const notificationsReducer = notificationsSlice.reducer;