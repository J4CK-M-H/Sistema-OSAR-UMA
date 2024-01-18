import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const GuardRoutes = () => {
  let { auth, loadingAuth } = useContext(AuthContext);
  if (loadingAuth) return;

  return auth?.usuario ? <Outlet /> : <Navigate replace to={"/login"} />;
};
