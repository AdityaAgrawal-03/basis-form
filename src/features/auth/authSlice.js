import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email }) => {
    const response = await axios.post(`${BASE_URL}/users/email`, {
      email: email,
    });

    return response.data.results;
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyToken",
  async ({ email, token, verificationCode }) => {
    const {
      data: { success, results },
    } = await axios.put(`${BASE_URL}/users/email/verify`, {
      email,
      token,
      verificationCode,
    });

    console.log(success, results)

    return { success, results };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    email: "",
    token: null,
    isLogin: false,
    error: null,
  },
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: {
    [verifyEmail.pending]: (state) => {
      state.status = "pending";
    },
    [verifyEmail.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.token = action.payload.token;
      state.isLogin = action.payload.isLogin;
    },
    [verifyEmail.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [verifyOtp.pending]: (state) => {
      state.status = "pending";
    },
    [verifyOtp.fulfilled]: (state, action) => {
      state.status = "fufilled";
      state.isLogin = action.payload.isLogin
    },
    [verifyOtp.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    }
  },
});

export const { addEmail } = authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
export const selectToken = (state) => state.auth.token;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectEmail = (state) => state.auth.email;

export default authSlice.reducer;
