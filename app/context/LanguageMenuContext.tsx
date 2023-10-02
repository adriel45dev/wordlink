"use client";
import { createContext, useState } from "react";

interface LanguageMenuContextType {
  isLanguageMenu: boolean;
  setIsLanguageMenu: (value: boolean) => void;
}

export const LanguageMenuContext = createContext<LanguageMenuContextType>(
  {} as LanguageMenuContextType,
);

export const LanguageMenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLanguageMenu, setIsLanguageMenu] = useState(false);

  return (
    <LanguageMenuContext.Provider value={{ isLanguageMenu, setIsLanguageMenu }}>
      {children}
    </LanguageMenuContext.Provider>
  );
};
