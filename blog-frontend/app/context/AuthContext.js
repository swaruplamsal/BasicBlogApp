"use client";

import { createContext, useContext, useState, useEffect } from "react";
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

  // Sync user data with backend on mount if token exists
  useEffect(() => {
    if (typeof window === "undefined" || !token) return;

    const syncUserData = async () => {
      try {
        const completeUser = await authApi.getCurrentUser();
        setUser(completeUser);
        localStorage.setItem("user", JSON.stringify(completeUser));
      } catch (error) {
        // If sync fails, user might be logged out - clear auth state
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    syncUserData();
  }, [token]);

  const login = async (username, password) => {
    try {
      const data = await authApi.login(username, password);

      setToken(data.token);
      localStorage.setItem("token", data.token);

      // Fetch complete user data including profile
      try {
        const completeUser = await authApi.getCurrentUser();
        setUser(completeUser);
        localStorage.setItem("user", JSON.stringify(completeUser));
      } catch (profileError) {
        // Fallback to basic user data if profile fetch fails
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

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

  const refreshUser = async () => {
    if (!token) return;

    try {
      const completeUser = await authApi.getCurrentUser();
      setUser(completeUser);
      localStorage.setItem("user", JSON.stringify(completeUser));
    } catch (error) {
      console.log("Failed to refresh user data:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
