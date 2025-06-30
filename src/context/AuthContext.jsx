import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [phone, setPhone] = useState(localStorage.getItem("userPhoneNumber"));
  const [isVerified, setIsVerified] = useState(localStorage.getItem("isVerified") === "true");

  useEffect(() => {
    if (phone) {
      localStorage.setItem("userPhoneNumber", phone);
    } else {
      localStorage.removeItem("userPhoneNumber");
    }
    localStorage.setItem("isVerified", isVerified ? "true" : "false");
  }, [phone, isVerified]);

  return (
    <AuthContext.Provider value={{ phone, setPhone, isVerified, setIsVerified }}>
      {children}
    </AuthContext.Provider>
  );
}