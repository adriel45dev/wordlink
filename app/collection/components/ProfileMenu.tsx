"use client";
import DownArrow from "@/public/icons/DownArrow";
import PauseIcon from "@/public/icons/PauseIcon";
import ProfileIcon from "@/public/icons/ProfileIcon";
import TurnOffIcon from "@/public/icons/TurnOffIcon";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ProfileMenu = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center justify-center rounded-3xl py-1 pl-1 pr-4 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
        onClick={() => setIsEnabled(!isEnabled)}
      >
        <ProfileIcon className="h-5 w-5" />
        <DownArrow className="h-2 w-2" />
      </button>
      <div
        className={`${
          isEnabled ? "block" : "hidden"
        } sm:max-w-auto absolute left-0 right-0 top-14 z-50 m-3 min-w-min max-w-full list-none divide-y divide-gray-100 rounded-lg  bg-white text-base shadow dark:bg-gray-700 sm:left-auto sm:right-8`}
      >
        <ul className="py-2 font-medium" role="none">
          <li>
            <Link
              href={"/"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white "
              role="menuitem"
              onClick={() => setIsEnabled(!isEnabled)}
            >
              <div className="inline-flex flex-row items-center  justify-center gap-2">
                <TurnOffIcon className="h-4 w-4" />
                <span>Log out</span>
              </div>
            </Link>
          </li>

          <div className="my-2 border-t-2 dark:border-gray-600"></div>
        </ul>
      </div>
    </>
  );
};

export default ProfileMenu;
