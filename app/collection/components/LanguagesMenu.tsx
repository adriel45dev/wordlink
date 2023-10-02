"use client";
import Image from "next/image";
import React, { useState, useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import {
  Language,
  LanguageCode,
  LanguageCodeReference,
} from "@/app/shared/enums/language-code-type";
import { LanguageMenuContext } from "@/app/context/LanguageMenuContext";
import { ProfileMenuContext } from "@/app/context/ProfileMenuContext";

const LanguagesMenu = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { isLanguageMenu, setIsLanguageMenu } = useContext(LanguageMenuContext);
  const { setIsProfileMenu } = useContext(ProfileMenuContext);

  return (
    <div className="flex w-full flex-col ">
      <button
        type="button"
        className="inline-flex cursor-pointer items-center justify-center rounded-3xl py-1 pl-1 pr-4 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
        onClick={() => {
          setIsLanguageMenu(!isLanguageMenu);
          setIsProfileMenu(false);
        }}
      >
        <Image
          src={`/images/flags/${language.selected}.svg`}
          alt="Flag Icon"
          className="mr-2 rounded-full hover:scale-105"
          width={32}
          height={32}
        />

        {LanguageCodeReference[language.selected]}

        <Image
          src={"/images/dropdown-arrow.svg"}
          alt="toggle"
          width={20}
          height={20}
          className="hover:rotate-180"
        />
      </button>

      <div
        className={`${
          isLanguageMenu ? "block" : "hidden"
        }  absolute right-0 top-0 z-50 mx-auto mt-20 w-full list-none divide-y divide-gray-100 rounded-lg px-4  text-base shadow md:mr-16 md:max-w-max`}
      >
        <ul
          className="w-full rounded-lg bg-gray-700 py-2 font-medium"
          role="none"
        >
          {Object.keys(language.languages).map((code, key) => {
            const lang_description = language.languages[code];

            return (
              <li
                key={key}
                onClick={() =>
                  setLanguage({ ...language, selected: code as LanguageCode })
                }
              >
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white "
                  role="menuitem"
                  onClick={() => setIsLanguageMenu(!isLanguageMenu)}
                >
                  <div className="inline-flex items-center ">
                    <Image
                      src={`/images/flags/${code}.svg`}
                      alt="Flag Icon"
                      className="mr-2 h-5 w-5 rounded-full"
                      width={14}
                      height={14}
                    />
                    {lang_description}
                  </div>
                </a>
              </li>
            );
          })}

          <div className="my-2 border-t-2 dark:border-gray-600"></div>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              <div className="inline-flex items-center">
                <Image
                  src={"/images/more.svg"}
                  alt="Flag Icon"
                  className="mr-2 h-3.5 w-3.5 rounded-full"
                  width={14}
                  height={14}
                />
                Add a new language
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguagesMenu;
