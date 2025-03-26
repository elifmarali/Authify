"use client";
import { useEffect, useState, createContext, useContext } from "react";
import Cookies from "universal-cookie";
import { verifyJWTToken } from "../../../../libs/auth"; // Mevcut doğrulama fonksiyonun

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const getVerifiedToken = async () => {
      const cookies = new Cookies();
      const token = cookies.get("token") ?? null;

      if (!token) {
        setAuth(null);
        return;
      }

      try {
        const verifiedToken = await verifyJWTToken(token);
        setAuth(verifiedToken);
      } catch (error) {
        console.error("Client-side JWT doğrulama hatası:", error);
        setAuth(null);
      }
    };

    getVerifiedToken();
  }, []);

  const value = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () =>{
  return useContext(AuthContext)
}

export default useAuth;