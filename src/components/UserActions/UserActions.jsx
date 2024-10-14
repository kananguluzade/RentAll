import React, { useContext } from "react";
import { AuthContext } from "../Auth/Services/authContext";
import AuthModalsHandler from "./AuthModalsHandler";
import UserMenu from "../UserMenu/UserMenu";

const UserActions = ({ user }) => {
  const { logout } = useContext(AuthContext);

  return user ? (
    <UserMenu user={user} logout={logout} />
  ) : (
    <AuthModalsHandler />
  );
};

export default UserActions;
