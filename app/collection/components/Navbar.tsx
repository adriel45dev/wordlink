"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import { NavbarContext } from "@/app/context/NavbarContext";

export default function Navbar() {
  const { tab, setTab } = useContext(NavbarContext);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  return (
    <>
      <button
        data-collapse-toggle="navbar-language"
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-controls="navbar-language"
        aria-expanded="false"
        onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <nav
        className={`${
          isDropdownMenuOpen ? "" : "hidden"
        } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
      >
        <ul className="mt-4 flex flex-col rounded-lg border-gray-700 bg-gray-950 p-4 font-medium text-white md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-gray-950 md:p-0">
          <li>
            <Link
              href="/collection/library"
              className={`${
                tab == "library" && "text-blue-500"
              } block rounded py-2 pl-3 pr-4   md:bg-transparent md:p-0`}
              aria-current="page"
            >
              Library
            </Link>
          </li>
          <li>
            <Link
              href="/collection/add"
              className={`${
                tab == "add" && "text-blue-500"
              } block rounded py-2 pl-3 pr-4   md:bg-transparent md:p-0`}
            >
              Add
            </Link>
          </li>
          <li>
            <Link
              href="/collection/vocabulary"
              className={`${
                tab == "vocabulary" && "text-blue-500"
              } block rounded py-2 pl-3 pr-4   md:bg-transparent md:p-0`}
            >
              Vocabulary
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
