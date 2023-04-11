import { Navigate, Outlet } from "react-router-dom";

export const Protected = ({ protectedInfo }) => {
  const { isSignedIn } = protectedInfo;
  console.log(isSignedIn);
  return isSignedIn ? <Outlet /> : <Navigate to="/login" />;
};
