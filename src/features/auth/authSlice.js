import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constant"

export const verifyEmail = createAsyncThunk("auth/verifyEmail", async ({ email }) => {
  const response = await axios.post(`${BASE_URL}/users/email`, {
    email: email
  })

  console.log(response)
  return response.data.results;
})

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    token: null,
    isLogin: false,
    error: null
  }, 
  extraReducers: {
    [verifyEmail.pending]: (state) => {
      state.status = "pending"
    },
    [verifyEmail.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.token = action.payload.token;
      state.isLogin = action.payload.isLogin
    },
    [verifyEmail.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    }
  }
})

export const selectAuthStatus = (state) => state.auth.status;
export const selectToken = (state) => state.auth.token;
export const selectIsLogin = (state) => state.auth.isLogin;

export default authSlice.reducer;