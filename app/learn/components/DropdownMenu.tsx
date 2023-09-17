import Image from "next/image";
import React from "react";
import { CODE_LANGUAGES } from "@/app/config";

const DropdownMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute top-14 left-0 right-0  sm:left-auto sm:right-8 m-3 max-w-full min-w-min sm:max-w-auto`}
      id="language-dropdown-menu"
    >
      <ul className="py-2 font-medium" role="none">
        {Object.keys(CODE_LANGUAGES).map((key) => (
          <li key={key}>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white "
              role="menuitem"
            >
              {/* ... English (US) menu item content ... */}
              <div className="inline-flex items-center ">
                <Image
                  src={`/images/flags/${key}.svg`}
                  alt="Flag Icon"
                  className="h-3.5 w-3.5 rounded-full mr-2"
                  width={14}
                  height={14}
                />
                {CODE_LANGUAGES[key]}
              </div>
            </a>
          </li>
        ))}

        <div className="border-t-2 my-2 dark:border-gray-600"></div>
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
                className="h-3.5 w-3.5 rounded-full mr-2"
                width={14}
                height={14}
              />
              Add a new language
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
