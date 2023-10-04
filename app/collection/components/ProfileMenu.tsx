"use client";
import { LanguageMenuContext } from "@/app/context/LanguageMenuContext";
import { ProfileMenuContext } from "@/app/context/ProfileMenuContext";
import { UserContext } from "@/app/context/UserContext";
import { UserLogginContext } from "@/app/context/UserLoggingContext";
import DownArrow from "@/public/icons/DownArrow";
import ProfileIcon from "@/public/icons/ProfileIcon";
import TurnOffIcon from "@/public/icons/TurnOffIcon";
import Link from "next/link";
import React, { useContext } from "react";

const ProfileMenu = () => {
  const { isProfileMenu, setIsProfileMenu } = useContext(ProfileMenuContext);
  const { setIsLanguageMenu } = useContext(LanguageMenuContext);
  const { user } = useContext(UserContext);
  const { setIsUser } = useContext(UserLogginContext);

  return (
    <>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center justify-center rounded-3xl py-1 pl-1 pr-4 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
        onClick={() => {
          setIsProfileMenu(!isProfileMenu);
          setIsLanguageMenu(false);
        }}
      >
        <ProfileIcon className="h-5 w-5" />
        <DownArrow className="h-2 w-2" />
      </button>
      <div
        className={`${
          isProfileMenu ? "block" : "hidden"
        } absolute right-0 top-0 z-50 mt-20 w-full  list-none divide-y divide-gray-100 rounded-lg px-4 text-base  shadow md:mr-10 md:max-w-max`}
      >
        <ul
          className="w-full rounded-2xl bg-gray-700 py-2 font-medium"
          role="none"
        >
          <li>
            <Link
              href={"/collection/profile"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white "
              role="menuitem"
              onClick={() => setIsProfileMenu(!isProfileMenu)}
            >
              <div className="inline-flex flex-row items-center justify-center gap-2">
                <ProfileIcon className="h-4 w-4" />
                <span>{user?.username}</span>
              </div>
            </Link>
          </li>
          <div className="my-2 border-t-2 dark:border-gray-600"></div>
          <li>
            <Link
              href={"/"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white "
              role="menuitem"
              onClick={() => {
                setIsProfileMenu(!isProfileMenu);
                setIsUser(false);
              }}
            >
              <div className="inline-flex flex-row items-center justify-center gap-2">
                <TurnOffIcon className="h-4 w-4" />
                <span>Log out</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileMenu;
