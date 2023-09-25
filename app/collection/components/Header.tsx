"use client";
import React, { useState } from "react";
import Image from "next/image";
import LanguagesMenu from "./LanguagesMenu";
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
              alt="Worlink Logo"
              width={32}
              height={32}
              className="mr-3 h-8"
            />
          </Link>

          <div className="flex items-center md:order-2">
            {/* Deve carregar o ultimo idioma estudado */}

            <LanguagesMenu />

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
