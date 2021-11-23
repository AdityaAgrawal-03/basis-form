import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, INVITE_URL } from "../../utils/constant";

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email }) => {
    const response = await axios.post(`${BASE_URL}/users/email`, {
      email: email,
    });

    return response.data;
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
  async ({ firstName, lastName, email, referredCodeKey, token, phone }) => {
    const response = await axios.post(`${BASE_URL}/users`, {
      firstName,
      lastName,
      email,
      referredCodeKey,
      agreeToPrivacyPolicy: true,
      token,
      source: "WEB_APP",
      phoneNumber: phone,
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

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({ userId, authToken }) => {
    const AUTH_TOKEN = `Bearer ${userId},${authToken}`;
    const response = await axios.delete(`${BASE_URL}/users/logout/${userId}`, {
      headers: { Authorization: AUTH_TOKEN },
    });

    return response.data;
  }
);

export const getInvite = createAsyncThunk(
  "auth/getInvite",
  async ({ token }) => {
    const response = await axios.get(`${INVITE_URL}/invite`, {
      headers: { Authorization: token },
    });

    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    email: "",
    token: null,
    authToken: null,
    isLogin: false,
    error: null,
    wrongEmailTokenCount: 0,
    resendEmailTokenCount: 0,
    name: "",
    phone: "",
    userId: "",
    avatar: "",
    referralToken: "",
    isReferralTokenValid: true,
    otpResponseSuccess: null,
  },
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    resetAuth: (state, { payload }) => {
      state.status = payload.status;
      state.email = payload.email;
      state.token = payload.token;
      state.authToken = payload.authToken;
      state.isLogin = payload.login;
      state.error = payload.error;
      state.wrongEmailTokenCount = payload.wrongEmailTokenCount;
      state.resendEmailTokenCount = payload.resendEmailTokenCount;
      state.name = payload.name;
      state.phone = payload.phone;
      state.userId = payload.userId;
      state.referralToken = payload.referralToken;
      state.isReferralTokenValid = payload.isReferralTokenValid;
    },
  },
  extraReducers: {
    [verifyEmail.pending]: (state) => {
      state.status = "pending";
    },
    [verifyEmail.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.token = String(payload.results.token);
      state.isLogin = payload.results.isLogin;
    },
    [verifyEmail.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [verifyOtp.pending]: (state) => {
      state.status = "pending";
      state.responseSuccess = false;
    },
    [verifyOtp.fulfilled]: (state, { payload }) => {
      state.status = "fufilled";
      state.otpResponseSuccess = payload.success;

      if (payload.success) {
        state.isLogin = payload.results.isLogin;

        if (payload.results.isLogin) {
          state.name = `${payload.results.user.firstName} ${payload.results.user.lastName}`;

          state.phone = payload.results.user.phoneNumber;

          state.userId = payload.results.user._id;

          state.avatar = payload.results.user.avatar;

          state.authToken = payload.results.user.token;
        }

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

      state.name = `${payload.results.user.firstName} ${payload.results.user.lastName}`;
      state.phone = payload.results.user.phoneNumber;
      state.userId = payload.results.user._id;
      state.authToken = payload.results.user.token;
      state.avatar = payload.results.user.avatar;
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
    [logoutUser.pending]: (state) => {
      state.status = "pending";
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [logoutUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [getInvite.pending]: (state) => {
      state.status = "pending";
    },
    [getInvite.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";

      if (payload.success) {
        state.referralToken = payload.inviteCode;
        state.isReferralTokenValid = true;
      } else {
        state.isReferralTokenValid = false;
      }
    },
    [getInvite.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export const { addEmail, resetAuth, resetResponseSuccess } = authSlice.actions;

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
export const selectName = (state) => state.auth.name;
export const selectPhone = (state) => state.auth.phone;
export const selectAvatar = (state) => state.auth.avatar;
export const selectAuthToken = (state) => state.auth.authToken;
export const selectUserId = (state) => state.auth.userId;
export const selectReferralToken = (state) => state.auth.referralToken;
export const selectOtpResponseSuccess = (state) =>
  state.auth.otpResponseSuccess;

export default authSlice.reducer;
