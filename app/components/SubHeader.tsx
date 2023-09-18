"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import Menu from "./Menu";

const SubHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <nav className=" border-gray-200 bg-gray-950">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/learn" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Flowbite Logo"
              width={32}
              height={32}
              className="h-8 mr-3"
            />
          </Link>

          <div className="flex items-center md:order-2">
            {/* Deve carregar o ultimo idioma estudado */}

            <button
              data-dropdown-toggle="language-dropdown-menu"
              type="button"
              className="inline-flex items-center font-medium justify-center pr-4 pl-1 py-1 text-sm text-gray-900 dark:text-white rounded-3xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-gray-800 dark:hover:text-white"
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
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-language"
              aria-expanded="false"
              onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
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
          <Menu isOpen={isDropdownMenuOpen} />
        </div>
      </nav>
    </header>
  );
};

export default SubHeader;
