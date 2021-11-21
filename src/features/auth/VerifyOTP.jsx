import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectEmail, selectToken, verifyOtp } from "../index";

export function VerifyOTP() {
  const email = useSelector(selectEmail);
  const token = useSelector(selectToken);
  const [otp, setOtp] = useState({
    valueOne: "",
    valueTwo: "",
    valueThree: "",
    valueFour: "",
    valueFive: "",
    valueSix: "",
  });

  const dispatch = useDispatch();

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
            className="otp-box"
            value={otp.valueOne}
            onChange={(e) => setOtp({ ...otp, valueOne: e.target.value })}
          />
        </div>
        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            className="otp-box"
            value={otp.valueTwo}
            onChange={(e) => setOtp({ ...otp, valueTwo: e.target.value })}
          />
        </div>

        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            className="otp-box"
            value={otp.valueThree}
            onChange={(e) => setOtp({ ...otp, valueThree: e.target.value })}
          />
        </div>
        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            className="otp-box"
            value={otp.valueFour}
            onChange={(e) => setOtp({ ...otp, valueFour: e.target.value })}
          />
        </div>
        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            className="otp-box"
            value={otp.valueFive}
            onChange={(e) => setOtp({ ...otp, valueFive: e.target.value })}
          />
        </div>

        <div className="h-16 w-12 border-2 border-green-500 rounded-md mt-2 md:mr-4">
          <input
            type="text"
            maxLength="1"
            className="otp-box"
            value={otp.valueSix}
            onChange={(e) => setOtp({ ...otp, valueSix: e.target.value })}
          />
        </div>
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
