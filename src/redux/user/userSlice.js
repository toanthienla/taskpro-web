import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAxiosInstance from '~/apis/authAxios.js';
import { API_ROOT } from '~/utils/constants';

const initialState = {
  currentUser: null
};

// Async function when call API
export const loginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data) => {
    const response = await authAxiosInstance.post(`${API_ROOT}/v1/users/login`, data);
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