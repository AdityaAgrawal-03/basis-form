export { Login } from "./auth/Login";
export { VerifyOTP } from "./auth/VerifyOTP";
export  { Signup } from "./auth/Signup";
export { Profile } from "./auth/Profile"

export {
  selectAuthStatus,
  selectIsLogin,
  selectToken,
  verifyEmail,
  addEmail,
  selectEmail,
  verifyOtp,
  selectResendEmailTokenCount,
  selectWrongEmailTokenCount,
  resetAuth,
  resendOtp,
  signupUser
} from "./auth/authSlice";
