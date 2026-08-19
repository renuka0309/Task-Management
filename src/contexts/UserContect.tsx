// src/contexts/UserContext.tsx
"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  email: string;
  fullName: string;
  title: string;
  username: string;
};

type UserContextType = {
  user: User;
  updateUser: (updates: Partial<User>) => void;
};

const UserContext = createContext<UserContextType | null>(null);

const defaultUser: User = {
  email: "dexter@gmail.com",
  fullName: "Dexter",
  title: "Designer",
  username: "Dexuser",
};

function getInitialUser(): User {
  if (typeof window === "undefined") return defaultUser;
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : defaultUser;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(getInitialUser);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}