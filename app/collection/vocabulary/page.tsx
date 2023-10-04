"use client";
import { NavbarContext } from "@/app/context/NavbarContext";
import React, { useContext, useEffect, useState } from "react";
import Table from "./components/Table";
import NoUserLogged from "@/app/components/NoUserLogged";
import { UserContext } from "@/app/context/UserContext";
import { UserLogginContext } from "@/app/context/UserLoggingContext";
import LupaIcon from "@/public/icons/LupaIcon";

export default function Vocabulary() {
  const { setTab } = useContext(NavbarContext);
  const [vocabulary, setVocabulary] = useState<{
    [key: string]: { des: string[]; state: string };
  }>({});
  const { user } = useContext(UserContext);
  const { isUser } = useContext(UserLogginContext);
  const [search, setSearch] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTab("vocabulary"), []);

  useEffect(() => {
    if (!user || !isUser) return;
    if (search) return;
    const { language_key, username } = user;
    const dataJSON = localStorage.getItem(
      `${language_key}_${username}_vocabulary`,
    );

    if (dataJSON) {
      setVocabulary(JSON.parse(dataJSON));
    } else {
      setVocabulary({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, search]);

  const filterSearch = (value: string) => {
    const filtered = Object.keys(vocabulary).filter((key) => {
      return key.includes(value.toLowerCase());
    });

    let sorted = filtered.sort((a, b) => {
      return a.indexOf(value) - b.indexOf(value);
    });

    const result: { [key: string]: { des: string[]; state: string } } = {};

    sorted.forEach((s) => {
      result[s] = {
        ...vocabulary[s],
      };
    });

    setVocabulary(result);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    filterSearch(value);
    setSearch(value);
  };

  console.log(search);

  return (
    <>
      <h1 className="my-6 text-4xl font-bold text-white">Vocabulary</h1>
      <div className="flex w-full flex-1 flex-col items-center ">
        <div className="flex w-full flex-col gap-2 overflow-x-auto rounded-lg  px-16 py-4">
          <div className="w-full text-sm text-slate-400">
            Total: {Object.keys(vocabulary).length}
          </div>
          {/* Search */}
          <div className="flex flex-row items-center justify-between ">
            <label htmlFor="vocabulary-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LupaIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                id="vocabulary-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search for vocabulary"
                onChange={handleSearch}
                value={search}
              />
            </div>
          </div>
        </div>
        <Table vocabulary={vocabulary} />
      </div>
    </>
  );
}
