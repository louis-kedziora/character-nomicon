import { Navigate, Outlet } from "react-router-dom";

export const Protected = ({ protectedInfo }) => {
  const { isSignedIn } = protectedInfo;

  return isSignedIn ? <Outlet /> : <Navigate to="/login" />;
};
