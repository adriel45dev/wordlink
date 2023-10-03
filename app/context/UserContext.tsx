"use client";
import { createContext, useState, useEffect, use } from "react";

type UserType = { [key: string]: string | { [key: string]: string } };

type UserDefaultType = {
  username: string;
  name: string;
  email: string;
  password: string;
  displaylanguage: string;
  languages: {
    [key: string]: {
      name: string;
      country: string;
      code: string;
    };
  };
  currentlanguage: {
    name: string;
    country_code: string;
    target_code: string;
    display_code: string;
  };
  language_key: string;
};

type UserContextType = {
  user: UserDefaultType | null;
  setUser: (user: UserDefaultType | null) => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserDefaultType | null>(null);

  useEffect(() => {
    const dataJSON = localStorage.getItem("connected_user");
    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      setUser(data as UserDefaultType);
    }
  }, []);

  useEffect(() => {
    const dataJSON = localStorage.getItem("connected_user");
    if (!user) return;
    if (!dataJSON) return;

    localStorage.setItem("connected_user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
