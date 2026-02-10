"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const FAMILY_STORAGE_KEY = "family_accounts";

interface FamilyAccount {
  id: string;
  nickname: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  familyAccounts?: FamilyAccount[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  hasFamilyAccount: boolean;
  familyAccounts: FamilyAccount[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  socialLogin: (provider: "kakao" | "naver" | "google") => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  addFamilyAccount: (id: string, nickname: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [familyAccounts, setFamilyAccounts] = useState<FamilyAccount[]>([]);

  const isLoggedIn = user !== null;
  const hasFamilyAccount = familyAccounts.length > 0;

  // localStorage에서 가족 계정 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(FAMILY_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFamilyAccounts(parsed);
      } catch {
        // 파싱 실패 시 무시
      }
    }
  }, []);

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

  const addFamilyAccount = async (id: string, nickname: string): Promise<boolean> => {
    if (id && nickname) {
      const newFamilyAccount: FamilyAccount = { id, nickname };
      const newFamilyAccounts = [...familyAccounts, newFamilyAccount];
      setFamilyAccounts(newFamilyAccounts);
      localStorage.setItem(FAMILY_STORAGE_KEY, JSON.stringify(newFamilyAccounts));
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
        familyAccounts,
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
