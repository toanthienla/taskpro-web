import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAxiosInstance from '~/apis/authAxios.js';
import { API_ROOT } from '~/utils/constants';

const initialState = {
  currentUser: null
};

export const loginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data) => {
    const response = await authAxiosInstance.post(`${API_ROOT}/v1/users/login`, data);
    return response.data;
  }
);

export const logoutUserApi = createAsyncThunk(
  'user/logoutUserApi',
  async () => {
    const response = await authAxiosInstance.delete(`${API_ROOT}/v1/users/logout`);
    return response.data;
  }
);

export const updateUserApi = createAsyncThunk(
  'user/updateUserApi',
  async (data) => {
    const response = await authAxiosInstance.put(`${API_ROOT}/v1/users/update`, data);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // Handle async data
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      // fulfilled is when promise is success
      // action.payload is return reponse data
      const user = action.payload;
      state.currentUser = user;
    });
    builder.addCase(logoutUserApi.fulfilled, (state) => {
      // ProtectedRoute will shoot it to login page
      state.currentUser = null;
    });
    builder.addCase(updateUserApi.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
// dispath() -> update data by reducer
// export const {  } = userSlice.actions;

// Selectors -> useSelector()
export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export const userReducer = userSlice.reducer;