import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return user ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
