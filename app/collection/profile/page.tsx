"use client";
import NoUserLogged from "@/app/components/NoUserLogged";
import { UserLogginContext } from "@/app/context/UserLoggingContext";
import { useContext } from "react";

export default function Profile() {
  const { isUser } = useContext(UserLogginContext);
  if (!isUser) return <NoUserLogged />;

  return (
    <div className="my-4 flex w-full flex-row items-center justify-center text-4xl text-white">
      Profile
    </div>
  );
}
