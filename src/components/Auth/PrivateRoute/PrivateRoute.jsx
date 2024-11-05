import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Services/authContext";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
