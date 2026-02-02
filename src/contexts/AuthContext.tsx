"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  familyAccounts?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  hasFamilyAccount: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  socialLogin: (provider: "kakao" | "naver" | "google") => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  addFamilyAccount: (familyCode: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = user !== null;
  const hasFamilyAccount = (user?.familyAccounts?.length ?? 0) > 0;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - 실제로는 API 호출
    if (email && password) {
      setUser({
        id: "mock-user-1",
        email,
        name: email.split("@")[0],
        familyAccounts: [],
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const socialLogin = async (provider: "kakao" | "naver" | "google"): Promise<boolean> => {
    // Mock social login
    setUser({
      id: `${provider}-user-1`,
      email: `${provider}@example.com`,
      name: `${provider} 사용자`,
      familyAccounts: [],
    });
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup
    if (email && password && name) {
      setUser({
        id: "new-user-1",
        email,
        name,
        familyAccounts: [],
      });
      return true;
    }
    return false;
  };

  const addFamilyAccount = async (familyCode: string): Promise<boolean> => {
    // Mock family account registration
    if (user && familyCode) {
      setUser({
        ...user,
        familyAccounts: [...(user.familyAccounts || []), familyCode],
      });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        hasFamilyAccount,
        login,
        logout,
        socialLogin,
        signup,
        addFamilyAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
