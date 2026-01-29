// app/context/AuthContext.js
"use client";

import { createContext, useContext, useState } from "react";

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
    const res = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    } else {
      return { success: false, error: data.error || "Login failed" };
    }
  };

  const signup = async (username, email, password) => {
    const res = await fetch("http://127.0.0.1:8000/api/v1/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    } else {
      return { success: false, error: data.error || "Signup failed" };
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
