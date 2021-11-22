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

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email, token }) => {
    const response = await axios.put(`${BASE_URL}/users/token/resendtoken`, {
      email: email,
      token: token,
    });

    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ firstName, lastName, email, referredCodeKey, token }) => {
    const response = await axios.post(`${BASE_URL}/users`, {
      firstName,
      lastName,
      email,
      referredCodeKey,
      agreeToPrivacyPolicy: true,
      token,
      source: "WEB_APP",
    });

    return response.data;
  }
);

export const checkReferralToken = createAsyncThunk(
  "auth/checkReferral",
  async ({ referral }) => {
    const response = await axios.get(`${BASE_URL}/users/referral/${referral}`);

    return response.data;
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
    wrongEmailTokenCount: 0,
    resendEmailTokenCount: 0,
    name: "",
    phone: "",
    referralToken: "",
    isReferralTokenValid: true,
  },
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    resetAuth: (state, { payload }) => {
      state.status = payload.status;
      state.email = payload.email;
      state.token = payload.token;
      state.isLogin = payload.login;
      state.error = payload.error;
      state.wrongEmailTokenCount = payload.wrongEmailTokenCount;
      state.resendEmailTokenCount = payload.resendEmailTokenCount;
    },
  },
  extraReducers: {
    [verifyEmail.pending]: (state) => {
      state.status = "pending";
    },
    [verifyEmail.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.token = String(action.payload.token);
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
    [resendOtp.pending]: (state) => {
      state.status = "pending";
    },
    [resendOtp.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";

      if (payload.success) {
        state.wrongEmailTokenCount = payload.results.wrongEmailTokenCount;
        state.resendEmailTokenCount = payload.results.resendEmailTokenCount;
      }
    },
    [resendOtp.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [signupUser.pending]: (state) => {
      state.status = "pending";
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";

      state.name =
        payload.results.user.firstName + payload.results.user.lastName;
      state.phone = payload.results.user.phoneNumber;
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [checkReferralToken.pending]: (state) => {
      state.status = "pending";
    },
    [checkReferralToken.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";

      if (payload.success) {
        state.referralToken = payload.results.referralToken;
        state.isReferralTokenValid = true;
      } else {
        state.isReferralTokenValid = false;
      }
    },
    [checkReferralToken.rejected]: (state, action) => {
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
export const selectReferralTokenValidity = (state) =>
  state.auth.isReferralTokenValid;

export default authSlice.reducer;
