"use client";
import Image from "next/image";
import React, { useState, useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import {
  LanguageCode,
  LanguageCodeReference,
} from "@/app/shared/enums/language-code-type";

const LanguagesMenu = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center justify-center rounded-3xl py-1 pl-1 pr-4 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
        onClick={() => setIsEnabled(!isEnabled)}
      >
        <Image
          src={`/images/flags/${language.selected}.svg`}
          alt="Flag Icon"
          className="mr-2 rounded-full hover:scale-105"
          width={32}
          height={32}
        />
        <Image
          src={"/images/dropdown-arrow.svg"}
          alt="toggle"
          width={20}
          height={20}
          className="hover:rotate-180"
        />
        {/* English */}
      </button>
      <div
        className={`${
          isEnabled ? "block" : "hidden"
        } sm:max-w-auto absolute left-0 right-0 top-14 z-50 m-3 min-w-min max-w-full list-none divide-y divide-gray-100 rounded-lg  bg-white text-base shadow dark:bg-gray-700 sm:left-auto sm:right-8`}
      >
        <ul className="py-2 font-medium" role="none">
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
                  onClick={() => setIsEnabled(!isEnabled)}
                >
                  <div className="inline-flex items-center ">
                    <Image
                      src={`/images/flags/${code}.svg`}
                      alt="Flag Icon"
                      className="mr-2 h-3.5 w-3.5 rounded-full"
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
    </>
  );
};

export default LanguagesMenu;
