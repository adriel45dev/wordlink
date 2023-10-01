"use client";

import Alert from "@/app/components/Alert";
import AlertType from "@/app/shared/enums/alert-type.enums";
import AlertDataType from "@/app/shared/types/alert-data.types";
import EyeClosedIcon from "@/public/icons/EyeClosedIcon";
import EyeOpenIcon from "@/public/icons/EyeOpenIcon";
import { useState } from "react";
const md5 = require("md5");

export default function Login() {
  const [AlertData, setAlertData] = useState<AlertDataType>({
    type: AlertType.Success,
    message: "",
    display: false,
  });
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const getUsers = async () => {
    const dataJSON = localStorage.getItem("users");
    if (dataJSON) {
      return JSON.parse(dataJSON);
    }
    return false;
  };

  const postConnectedUser = (user: { [key: string]: string }) => {
    localStorage.setItem("connected_user", JSON.stringify(user));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const users = await getUsers();

    const { email, password } = dataLogin;

    if (!email || !password)
      return setAlertData({
        type: AlertType.Warning,
        message:
          "Please fill in all required fields. One or more inputs are currently empty.",
        display: true,
      });

    if (!users)
      return setAlertData({
        type: AlertType.Info,
        message:
          "Hmm, we don't seem to have an account with this username or email on file. Check the details entered and try again.",
        display: true,
        link: {
          label: "Create an account",
          href: "/accounts/signup",
        },
      });

    const dataUser =
      users[email] ||
      users[Object.keys(users).filter((key) => users[key].email === email)[0]];

    if (!dataUser?.username)
      return setAlertData({
        type: AlertType.Info,
        message:
          "Hmm, we don't seem to have an account with this username or email on file. Check the details entered and try again.",
        display: true,
        link: {
          label: "Create an account",
          href: "/accounts/signup",
        },
      });
    if (dataUser.password != md5(password))
      return setAlertData({
        type: AlertType.Danger,
        message:
          "That password doesn't match our records. Please review your password and try again.",
        display: true,
      });

    postConnectedUser(dataUser);

    return setAlertData({
      type: AlertType.Success,
      message: "You are now logged into your account. Enjoy your time with us.",
      display: true,
    });
  };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAlertData((alert) => ({ ...alert, display: false }));
    setDataLogin((prevDataLogin) => ({
      ...prevDataLogin,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col items-center bg-gray-900 px-4 text-white md:px-16">
      <h1 id="title" className="my-4 text-4xl font-bold">
        Login
      </h1>

      {AlertData.display && (
        <div className="w-full">
          <Alert data={{ AlertData, setAlertData }} />
        </div>
      )}

      <form className="w-full">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Username or email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleForm}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>

          <div className="mb-6 flex">
            <input
              onChange={handleForm}
              value={dataLogin.password}
              required
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
              placeholder=""
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-blue-600  dark:border-gray-600 dark:bg-gray-600 dark:text-white"
            >
              {showPassword ? (
                <EyeOpenIcon className="h-6 w-6" />
              ) : (
                <EyeClosedIcon className="h-6 w-6" />
              )}
            </span>
          </div>
        </div>

        <div className="mb-6 flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="button"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}
