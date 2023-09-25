"use client";
import { createContext, useState } from "react";

interface NavbarContextType {
  tab: string;
  setTab: (tab: string) => void;
}

export const NavbarContext = createContext<NavbarContextType>(
  {} as NavbarContextType,
);

export const NavbarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tab, setTab] = useState("");

  return (
    <NavbarContext.Provider value={{ tab, setTab }}>
      {children}
    </NavbarContext.Provider>
  );
};
