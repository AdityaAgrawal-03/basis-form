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
    const response = await axios.put(`${BASE_URL}/users/email/verify`, {
      email,
      token,
      verificationCode,
    });

    return response.data;
  }
);

// export const resendOtp = createAsyncThunk("auth/resendOtp", async () => {

// })

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    email: "",
    token: null,
    isLogin: false,
    error: null,
    wrongEmailTokenCount: 0,
    resendEmailTokenCount: 0,
  },
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    resetAuth: (state) => {
      state.status = "idle";
      state.email = "";
      state.token = null;
      state.isLogin = false;
      state.error = null;
      state.wrongEmailTokenCount = 0;
      state.resendEmailTokenCount = 0;
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
    [verifyOtp.fulfilled]: (state, { payload }) => {
      state.status = "fufilled";

      if (payload.success) {
        state.isLogin = payload.results.isLogin;
        state.wrongEmailTokenCount = payload.results.wrongEmailTokenCount;
        state.resendEmailTokenCount = payload.results.resendEmailTokenCount;
      } else {
        state.wrongEmailTokenCount = payload.messageObj.wrongEmailTokenCount;
        state.resendEmailTokenCount = payload.messageObj.resendEmailTokenCount;
      }
    },
    [verifyOtp.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export const { addEmail, resetAuth } = authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
export const selectToken = (state) => state.auth.token;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectEmail = (state) => state.auth.email;
export const selectWrongEmailTokenCount = (state) =>
  state.auth.wrongEmailTokenCount;
export const selectResendEmailTokenCount = (state) =>
  state.auth.resendEmailTokenCount;

export default authSlice.reducer;
