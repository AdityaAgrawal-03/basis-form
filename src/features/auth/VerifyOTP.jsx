import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { send } from "emailjs-com";
import {
  selectEmail,
  selectToken,
  verifyOtp,
  selectResendEmailTokenCount,
  selectWrongEmailTokenCount,
  resetAuth,
  resendOtp,
  selectIsLogin,
  selectOtpResponseSuccess,
} from "../index";
import {
  SERVICE_ID,
  TEMPLATE_ID,
  USER_ID,
  resetToInitialState,
} from "../../utils/constant";

export function VerifyOTP() {
  const email = useSelector(selectEmail);
  const token = useSelector(selectToken);
  const isLogin = useSelector(selectIsLogin);
  const success = useSelector(selectOtpResponseSuccess);
  const [otp, setOtp] = useState({
    valueOne: "",
    valueTwo: "",
    valueThree: "",
    valueFour: "",
    valueFive: "",
    valueSix: "",
  });
  const [error, setError] = useState("");

  const resendEmailCount = useSelector(selectResendEmailTokenCount);
  const wrongOtpCount = useSelector(selectWrongEmailTokenCount);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const checkOtp = () => {
    let verificationCode =
      otp.valueOne +
      otp.valueTwo +
      otp.valueThree +
      otp.valueFour +
      otp.valueFive +
      otp.valueSix;

    dispatch(
      verifyOtp({
        email: email,
        token: token,
        verificationCode: verificationCode,
      })
    );
  };

  const resendEmail = () => {
    send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: email,
      },
      USER_ID
    )
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    dispatch(resendOtp({ email: email, token: token }));
  };

  /* otp validation w.r.t to API */
  useEffect(() => {
    if (isLogin === true && success === true) {
      navigate("/profile");
    } else if (isLogin === false && success === true) {
      navigate("/signup");
    } else if (success === false) {
      setError("Wrong otp, please enter again!");
    }
  }, [isLogin, navigate, success]);

  /* navigate to login page after 3 unsuccessful or 3 resend otp actions */
  useEffect(() => {
    if (wrongOtpCount >= 3 || resendEmailCount >= 3) {
      dispatch(resetAuth(resetToInitialState));

      navigate("/", { replace: true });
    }
  }, [wrongOtpCount, resendEmailCount, navigate, dispatch]);

  /* auto-focus to next input element */
  const checkFocus = (e) => {
    const [fieldName, fieldIndex] = e.target.name.split("-");

    if (e.target.value.length >= e.target.maxLength) {
      if (parseInt(fieldIndex, 10) < 6) {
        const nextSibling = document.querySelector(
          `input[name=otp-${parseInt(fieldIndex, 10) + 1}]`
        );

        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-sm md:text-2xl">
      <p>
        Enter the OTP sent to <strong> {email} </strong>
      </p>
      <div className="flex w-full md:w-1/2 h-20 justify-between  mt-4">
        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            name="otp-1"
            className="otp-box"
            autoFocus
            value={otp.valueOne}
            onChange={(e) => {
              setOtp({ ...otp, valueOne: e.target.value });
              checkFocus(e);
            }}
          />
        </div>
        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            name="otp-2"
            className="otp-box"
            value={otp.valueTwo}
            onChange={(e) => {
              setOtp({ ...otp, valueTwo: e.target.value });
              checkFocus(e);
            }}
          />
        </div>

        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            name="otp-3"
            className="otp-box"
            value={otp.valueThree}
            onChange={(e) => {
              setOtp({ ...otp, valueThree: e.target.value });
              checkFocus(e);
            }}
          />
        </div>
        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            name="otp-4"
            className="otp-box"
            value={otp.valueFour}
            onChange={(e) => {
              setOtp({ ...otp, valueFour: e.target.value });
              checkFocus(e);
            }}
          />
        </div>
        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            name="otp-5"
            className="otp-box"
            value={otp.valueFive}
            onChange={(e) => {
              setOtp({ ...otp, valueFive: e.target.value });
              checkFocus(e);
            }}
          />
        </div>

        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            name="otp-6"
            className="otp-box"
            value={otp.valueSix}
            onChange={(e) => {
              setOtp({ ...otp, valueSix: e.target.value });
              checkFocus(e);
            }}
          />
        </div>
      </div>
      <span className="text-red-500 my-2 md:text-lg"> {error} </span>
      <div className="md:w-1/2 w-full md:text-sm">
        <button
          className="text-basis hover:underline"
          onClick={(e) => resendEmail(e)}
        >
          Resend OTP
        </button>
      </div>

      <button
        className="bg-basis text-white mt-4 rounded-lg px-4 py-2 w-full text-lg hover:bg-green-600 md:w-1/2"
        onClick={(e) => checkOtp(e)}
      >
        Verify
      </button>
    </div>
  );
}
