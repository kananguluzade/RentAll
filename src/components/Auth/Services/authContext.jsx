import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
    }
    setIsUserLoading(false);
  }, []);

  const login = (userData) => {
    const userWithId = {
      ...userData,
      id: userData.id || Date.now(),
    };
    setUser(userWithId);
    localStorage.setItem("loggedInUser", JSON.stringify(userWithId));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  if (isUserLoading) return <div>Yükleniyor...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
