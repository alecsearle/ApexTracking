import React, { createContext, ReactNode, useContext, useState } from "react";

export type UserRole = "admin" | "employee";

type UserContextType = {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>("admin");

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
