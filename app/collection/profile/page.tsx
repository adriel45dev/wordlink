"use client";
import NoUserLogged from "@/app/components/NoUserLogged";
import { UserContext } from "@/app/context/UserContext";
import { UserLogginContext } from "@/app/context/UserLoggingContext";
import { useContext } from "react";

export default function Profile() {
  const { isUser } = useContext(UserLogginContext);
  const { user } = useContext(UserContext);
  if (!isUser || !user) return <NoUserLogged />;

  return (
    <div className="px-16">
      <div className="mt-24 bg-slate-800 p-8  shadow">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div className="order-last mt-20 flex flex-row items-center justify-center text-center md:order-first md:mt-0">
            {" "}
            <div>
              {" "}
              <p className="text-xl font-bold text-white">
                {Object.keys(user.languages).length}
              </p>{" "}
              <p className="text-gray-400">Languages</p>{" "}
            </div>{" "}
            {/* <div>
              {" "}
              <p className="text-xl font-bold text-white">10</p>{" "}
              <p className="text-gray-400">Words</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-xl font-bold text-white">89</p>{" "}
              <p className="text-gray-400">Links</p>{" "}
            </div>{" "} */}
          </div>{" "}
          <div className="relative">
            {" "}
            <div className="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 items-center justify-center rounded-full bg-gray-900 text-white shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="h-24 w-24"
              >
                {'{" "}'}
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 9a7 7 0 1 1 14 0H3z"
                  clipRule="evenodd"
                />
              </svg>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center">
            <button className="transform rounded bg-violet-600 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg">
              {" "}
              Languages
            </button>{" "}
            <button className="transform rounded bg-gray-700 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg">
              {" "}
              Settings
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-20 border-b pb-12 text-center">
          {" "}
          <h1 className="text-4xl font-medium text-white">{user.name}</h1>{" "}
          <p className="mt-3 font-light text-gray-600">@{user.username}</p>{" "}
          <p className="mt-2 text-gray-500">
            {Object.keys(user.languages)
              .map((key) => user.languages[key].name)
              .join(", ")}
          </p>{" "}
        </div>{" "}
        <div className="mt-12 flex flex-col justify-center">
          {" "}
          <p className="text-center font-light text-gray-600 lg:px-16">
            ...
          </p>{" "}
          <button className="mt-4 px-4 py-2  font-medium text-indigo-500">
            {" "}
            Settings
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
