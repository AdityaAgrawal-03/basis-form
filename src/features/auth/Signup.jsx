import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectToken, signupUser } from "../index";

export function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    referralCode: "",
  });
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail);

  const dispatch = useDispatch();

  const signup = (e) => {
    e.preventDefault();
    if (form.firstName && form.lastName && form.phone) {
      console.log("here");
      dispatch(
        signupUser({
          firstName: form.firstName,
          lastName: form.lastName,
          email: email,
          referredCodeKey: form.referralCode,
          token: token,
        })
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg w-full md:w-1/2 md:p-4 mx-4 p-2">
        <h1 className="text-center text-xl mb-4">Create Your Basis Account</h1>
        <form className="mt-2">
          <div className="flex flex-col">
            <label htmlFor="firstname" className="font-light">
              First Name :
            </label>
            <input
              id="firstname"
              className="signup-input"
              value={form.firstName}
              onChange={(e) =>
                setForm({
                  ...form,
                  firstName: e.target.value,
                })
              }
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name :</label>
            <input
              id="lastname"
              className="signup-input"
              value={form.lastName}
              onChange={(e) =>
                setForm({
                  ...form,
                  lastName: e.target.value,
                })
              }
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone :</label>
            <input
              id="phone"
              className="signup-input"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="referralCode">
              Referral <span className="font-thin"> (Optional) : </span>
            </label>
            <input
              id="referralCode"
              className="signup-input"
              type="text"
              maxLength="6"
              value={form.referralCode}
              onChange={(e) =>
                setForm({
                  ...form,
                  referralCode: e.target.value,
                })
              }
            />
          </div>
          <button
            className="uppercase bg-basis w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
            onClick={(e) => signup(e)}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
