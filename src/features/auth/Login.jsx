import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { send } from "emailjs-com";
import {
  SERVICE_ID,
  TEMPLATE_ID,
  USER_ID,
  VALIDATE_EMAIL,
} from "../../utils/constant";
import { verifyEmail, addEmail } from "../index";
import { useDispatch } from "react-redux";

export function Login() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: email,
      },
      USER_ID
    )
      .then(
        (response) =>
          response.status === 200 && navigate("/verify", { replace: true })
      )
      .catch((error) => console.error(error));

    dispatch(addEmail(email));
    dispatch(verifyEmail({ email }));

    setEmail("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full md:w-1/3 rounded-lg flex flex-col p-4">
        <label className="md:text-2xl">Enter your email ID: </label>
        <input
          type="email"
          className="p-2 rounded-md focus:ring-green-500 border-0 focus:ring-2 focus:outline-none mt-2 text-lg font-thin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="button"
          className={
            VALIDATE_EMAIL.test(email)
              ? "bg-basis mt-4 px-4 py-2 text-xl rounded-lg text-white"
              : "bg-basis opacity-60 mt-4 px-4 py-2 text-xl rounded-lg text-white cursor-not-allowed"
          }
          onClick={(e) => sendEmail(e)}
          disabled={VALIDATE_EMAIL.test(email) ? false : true}
        >
          Get OTP
        </button>
      </form>
    </div>
  );
}
