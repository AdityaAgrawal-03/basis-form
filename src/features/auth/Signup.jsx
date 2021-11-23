import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectEmail,
  selectToken,
  signupUser,
  checkReferralToken,
  selectReferralTokenValidity,
  getInvite,
  selectReferralToken,
} from "../index";
import { VALIDATE_NAME, VALIDATE_PHONE } from "../../utils/constant";

export function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    referralCode: "",
  });
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    phone: false,
  });
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail);
  const isReferralTokenValid = useSelector(selectReferralTokenValidity);
  const referralToken = useSelector(selectReferralToken);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  /* checks the validity of all the values in form fields */
  const isFormValid =
    VALIDATE_NAME.test(form.firstName) &&
    VALIDATE_NAME.test(form.lastName) &&
    VALIDATE_PHONE.test(form.phone) &&
    isReferralTokenValid;

  const signup = (e) => {
    e.preventDefault();
    if (isFormValid) {
      dispatch(
        signupUser({
          firstName: form.firstName,
          lastName: form.lastName,
          email: email,
          referredCodeKey: form.referralCode,
          token: token,
          phone: form.phone,
        })
      );
    }

    navigate("/profile", { replace: true });
  };

  /* hit invite url to get referral token */
  const getInviteLink = (e) => {
    e.preventDefault();

    dispatch(getInvite({ token: token }));
  };

  /* check referral token validity in real-time */
  useEffect(() => {
    dispatch(checkReferralToken({ referral: form.referralCode }));

    referralToken.length &&
      setForm((previousForm) => ({
        ...previousForm,
        referralCode: referralToken,
      }));
  }, [dispatch, form.referralCode, referralToken]);

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
              onChange={(e) => {
                setForm({
                  ...form,
                  firstName: e.target.value,
                });
                if (!VALIDATE_NAME.test(e.target.value)) {
                  setError({
                    ...error,
                    firstName: true,
                  });
                } else {
                  setError({
                    ...error,
                    firstName: false,
                  });
                }
              }}
              required={true}
            />
            {error.firstName && (
              <small className="text-red-500">
                Name should contain atleast 3 letters
              </small>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name :</label>
            <input
              id="lastname"
              className="signup-input"
              value={form.lastName}
              minLength="3"
              onChange={(e) => {
                setForm({
                  ...form,
                  lastName: e.target.value,
                });
                if (!VALIDATE_NAME.test(e.target.value)) {
                  setError({
                    ...error,
                    lastName: true,
                  });
                } else {
                  setError({
                    ...error,
                    lastName: false,
                  });
                }
              }}
              required={true}
            />
            {error.lastName && (
              <small className="text-red-500">
                Name should contain at least 3 letters
              </small>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone :</label>
            <input
              id="phone"
              className="signup-input"
              value={form.phone}
              onChange={(e) => {
                setForm({
                  ...form,
                  phone: e.target.value,
                });

                if (!VALIDATE_PHONE.test(Number(e.target.value))) {
                  setError({
                    ...error,
                    phone: true,
                  });
                } else {
                  setError({
                    ...error,
                    phone: false,
                  });
                }
              }}
              required={true}
            />
            {error.phone && (
              <small className="text-red-500">
                Please enter indian mobile number
              </small>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <label htmlFor="referralCode">
                Referral <span className="font-thin"> (Optional) : </span>
              </label>
              <button
                className="text-purple-500 underline"
                onClick={(e) => getInviteLink(e)}
              >
                Get invite
              </button>
            </div>

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
            className={
              isFormValid
                ? "uppercase bg-basis w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
                : "uppercase bg-basis w-full text-white px-4 py-2 rounded-md mt-4 opacity-60 cursor-not-allowed"
            }
            onClick={(e) => signup(e)}
            disabled={!isFormValid}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
