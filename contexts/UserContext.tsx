import { loadData, saveData, STORAGE_KEYS } from "@/utils/storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type UserRole = "admin" | "employee";

type UserContextType = {
  userRole: UserRole;
  setUserRole: (role: UserRole) => Promise<void>;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRoleState] = useState<UserRole>("admin");

  // Load user role from AsyncStorage on mount
  useEffect(() => {
    loadUserRole();
  }, []);

  const loadUserRole = async () => {
    const savedRole = await loadData<UserRole>(STORAGE_KEYS.USER_ROLE, "admin");
    setUserRoleState(savedRole);
  };

  const setUserRole = async (role: UserRole) => {
    setUserRoleState(role);
    await saveData(STORAGE_KEYS.USER_ROLE, role);
  };

  const isAdmin = () => userRole === "admin";
  const isEmployee = () => userRole === "employee";

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        isAdmin,
        isEmployee,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
