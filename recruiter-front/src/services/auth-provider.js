import React, { createContext, useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  login as firebaseLogin,
  register as firebaseRegister,
  logout as firebaseLogout,
} from "./auth.js";
const auth = getAuth();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  });

  const login = async (email, password) => {
    try {
      await firebaseLogin(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      throw new Error("Erro de autenticação: " + error.message);
    }
  };

  const register = async (email, password) => {
    try {
      await firebaseRegister(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      throw new Error("Erro ao registrar: " + error.message);
    }
  };

  const logout = async () => {
    try {
      await firebaseLogout();
      setIsLoggedIn(false);
    } catch (error) {
      throw new Error("Erro ao fazer logout: " + error.message);
    }
  };

  if (loading) {
    return <p></p>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }
  return context;
};
