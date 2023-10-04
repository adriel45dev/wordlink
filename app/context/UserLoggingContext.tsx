"use client";

import { useRouter } from "next/navigation";
import { useState, createContext, useEffect } from "react";
import UserType from "../shared/types/user.types";

// Define the context type
type UserLogginType = {
  isUser: boolean;
  setIsUser: (isUser: boolean) => void;
};

// create and export the context

export const UserLogginContext = createContext<UserLogginType>(
  {} as UserLogginType,
);

// create and export the provider
export const UserLogginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isUser, setIsUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // validate user data
    const userDataJSON = localStorage.getItem("connected_user");
    if (!userDataJSON) return setIsUser(false);

    const userData = JSON.parse(userDataJSON) as UserType;
    const { username, password, languages, currentlanguage, language_key } =
      userData;

    if (
      !username ||
      !password ||
      !languages ||
      !currentlanguage ||
      !language_key
    ) {
      alert("-- Someting is broken --");
      return setIsUser(false);
    }

    return setIsUser(true);
  }, []);

  useEffect(() => {
    if (!isUser) {
      localStorage.removeItem("connected_user");
      router.push("/accounts/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <UserLogginContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </UserLogginContext.Provider>
  );
};
