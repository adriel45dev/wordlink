// "use client";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  activePage: string;
  isOpen: boolean;
}

export default function Menu({ isOpen, activePage }: Props) {
  // const [activeLink, setActiveLink] = useState(activePage);

  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
    >
      <ul className="mt-4 flex flex-col rounded-lg border-gray-700 bg-gray-950 p-4 font-medium text-white md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-gray-950 md:p-0">
        <li>
          <Link
            href="/learn"
            className={`${
              activePage == "library" && "text-blue-500"
            } block rounded py-2 pl-3 pr-4   md:bg-transparent md:p-0`}
            aria-current="page"
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href="/add"
            className={`${
              activePage == "add" && "text-blue-500"
            } block rounded py-2 pl-3 pr-4   md:bg-transparent md:p-0`}
          >
            Add
          </Link>
        </li>
        <li>
          <Link
            href="/vocabulary"
            className={`${
              activePage == "vocabulary" && "text-blue-500"
            } block rounded py-2 pl-3 pr-4   md:bg-transparent md:p-0`}
          >
            Vocabulary
          </Link>
        </li>
      </ul>
    </div>
  );
}
