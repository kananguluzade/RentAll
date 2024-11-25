import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserWithToken(token);
    } else {
      setIsUserLoading(false);
    }
  }, []);

  const fetchUserWithToken = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error("Failed to fetch user data with token.");
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    } finally {
      setIsUserLoading(false);
    }
  };

  const login = (userData) => {
    if (userData && userData.token) {
      localStorage.setItem("token", userData.token);
      fetchUserWithToken(userData.token);
    } else {
      console.error("Login failed: token is missing in userData.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
