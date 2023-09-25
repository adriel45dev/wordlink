"use client";
import React, { useState } from "react";
import Image from "next/image";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import Navbar from "./Navbar";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <nav className="border-gray-200 bg-gray-950">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="/collection/library" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Flowbite Logo"
              width={32}
              height={32}
              className="mr-3 h-8"
            />
          </Link>

          <div className="flex items-center md:order-2">
            {/* Deve carregar o ultimo idioma estudado */}

            <button
              data-dropdown-toggle="language-dropdown-menu"
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-3xl py-1 pl-1 pr-4 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
              onClick={toggleDropdown}
            >
              <Image
                src="/images/flags/us.svg"
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

            <DropdownMenu isOpen={isDropdownOpen} />

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
          </div>
          {/* ... Other content ... */}
          <Navbar isOpen={isDropdownMenuOpen} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
