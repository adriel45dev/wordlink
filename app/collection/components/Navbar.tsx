"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import { NavbarContext } from "@/app/context/NavbarContext";

interface Props {
  isOpen: boolean;
}

export default function Navbar({ isOpen }: Props) {
  const { tab, setTab } = useContext(NavbarContext);
  return (
    <nav
      className={`${
        isOpen ? "" : "hidden"
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
  );
}
