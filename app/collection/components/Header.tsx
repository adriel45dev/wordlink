"use client";
import Image from "next/image";
import LanguagesMenu from "./LanguagesMenu";
import Link from "next/link";
import Navbar from "./Navbar";
import ProfileMenu from "./ProfileMenu";
import { useContext } from "react";
import { UserLogginContext } from "@/app/context/UserLoggingContext";

const Header = () => {
  const { isUser } = useContext(UserLogginContext);
  if (!isUser) return <></>;

  return (
    <header className="relative w-full">
      <nav className=" border-gray-200 bg-gray-950">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="/collection/library" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Worlink Logo"
              width={32}
              height={32}
              className="mr-3 h-8"
            />
          </Link>
          <div className="flex items-center justify-end gap-2 md:order-2">
            <LanguagesMenu />
            <ProfileMenu />
          </div>
          <Navbar />
        </div>
      </nav>
    </header>
  );
};

export default Header;
