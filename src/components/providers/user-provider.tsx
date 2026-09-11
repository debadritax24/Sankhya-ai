"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  designation: string;
  department: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("sankhya_user");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem("sankhya_user");
    return null;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(getInitialUser);

  const setUser = useCallback((userData: User) => {
    setUserState(userData);
    localStorage.setItem("sankhya_user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    localStorage.removeItem("sankhya_user");
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoggedIn: !!user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    return { user: null, setUser: () => {}, logout: () => {}, isLoggedIn: false };
  }
  return context;
}
