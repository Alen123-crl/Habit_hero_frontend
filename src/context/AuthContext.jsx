import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  
  const login = async (email, password) => {
    try {
      const res = await API.post("/login/", { email, password });

      const { user, tokens } = res.data;

      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return user;
    } catch (err) {
      throw err.response?.data?.detail || "Login failed.";
    }
  };
  const signup = async (data) => {
  try {
    const res = await API.post("/signup", data);
    return res.data; 
  } catch (err) {
    throw err;
  }
};

  
  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,signup, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
