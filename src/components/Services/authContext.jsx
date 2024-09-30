import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData)); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser"); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
