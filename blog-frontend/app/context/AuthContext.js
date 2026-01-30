"use client";

import { createContext, useContext, useState } from "react";
import { authApi } from "../../lib/api";

const AuthContext = createContext();

// Helper function to get initial state from localStorage
function getInitialAuth() {
  if (typeof window === "undefined") {
    return { token: null, user: null };
  }

  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  return {
    token: savedToken || null,
    user: savedUser ? JSON.parse(savedUser) : null,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getInitialAuth().user);
  const [token, setToken] = useState(() => getInitialAuth().token);

  const login = async (username, password) => {
    try {
      const data = await authApi.login(username, password);

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const data = await authApi.signup(username, email, password);

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
