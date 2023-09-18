import Link from "next/link";
import React from "react";

interface Props {
  isOpen: boolean;
}

export default function Menu({ isOpen }: Props) {
  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } items-center justify-between w-full md:flex md:w-auto md:order-1`}
    >
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-950 md:bg-gray-950 border-gray-700">
        <li>
          <Link
            href="#library"
            className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
            aria-current="page"
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href="#add"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Add
          </Link>
        </li>
        <li>
          <Link
            href="#vocabulary"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Vocabulary
          </Link>
        </li>
      </ul>
    </div>
  );
}
