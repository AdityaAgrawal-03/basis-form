import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPhone,
  selectAvatar,
  selectAuthToken,
  logoutUser,
  resetAuth,
  selectUserId,
} from "../index";
import { resetToInitialState } from "../../utils/constant";

export function Profile() {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const phone = useSelector(selectPhone);
  const avatar = useSelector(selectAvatar);
  const authToken = useSelector(selectAuthToken);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser({ userId: userId, authToken: authToken }));
    dispatch(resetAuth(resetToInitialState));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg w-full md:w-1/2 md:p-4 mx-4 p-2 flex flex-col items-center">
        <h1 className="text-basis text-xl md:text-2xl lg:text-3xl"> Basis </h1>
        <div className="w-1/2 md:w-1/3 p-4">
          <img
            src={avatar}
            alt="user avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-3/4 lg:w-1/2 flex px-2 mb-2">
          <span className="material-icons-round mr-4 ml-4">email</span>
          <p> {email} </p>
        </div>

        <div className="w-full md:w-3/4 lg:w-1/2 flex px-2 mb-2">
          <span className="material-icons mr-4 ml-4">badge</span>
          <p className="self-start"> {name} </p>
        </div>

        <div className="w-full md:w-3/4 lg:w-1/2 flex px-2 mb-4">
          <span className="material-icons-round mr-4 ml-4">call</span>
          <p> {phone} </p>
        </div>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md w-11/12 md:w-3/4 lg:w-1/2 hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
