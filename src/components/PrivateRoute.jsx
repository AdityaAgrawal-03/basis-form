import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectToken } from "../features/index";

export function PrivateRoute({ children }) {
  const token = useSelector(selectToken);

  return <>{token ? children : <Navigate to="/" replace={true} />}</>;
}
