"use client";
import { createContext, useState } from "react";

interface ProfileMenuContextType {
  isProfileMenu: boolean;
  setIsProfileMenu: (value: boolean) => void;
}

export const ProfileMenuContext = createContext<ProfileMenuContextType>(
  {} as ProfileMenuContextType,
);

export const ProfileMenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isProfileMenu, setIsProfileMenu] = useState(false);

  return (
    <ProfileMenuContext.Provider value={{ isProfileMenu, setIsProfileMenu }}>
      {children}
    </ProfileMenuContext.Provider>
  );
};
