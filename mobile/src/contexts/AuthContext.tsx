import React, { createContext, useState, ReactNode, useContext } from "react";

type AuthContextData = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email: string, password: string) => {
    if (email && password) {
      setIsLoggedIn(true);
      console.log("Usuário logado:", email);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    console.log("Usuário deslogado");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
