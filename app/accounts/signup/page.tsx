"use client";
import DownArrow from "@/public/icons/DownArrow";
import Image from "next/image";
import BingSupportedLanguages from "@/app/shared/data/supported.lang";
import { useEffect, useState } from "react";
import { RegAnySpaces } from "@/app/shared/Regex";
import EyeClosedIcon from "@/public/icons/EyeClosedIcon";
import EyeOpenIcon from "@/public/icons/EyeOpenIcon";

type CountryType = {
  name: string;
  alpha: string;
};

type DataFormType = { [key: string]: string };

const DefaultDataForm: DataFormType = {
  language: "",
  displaylanguage: "",
  name: "",
  email: "",
  password: "",
  username: "",
};

const DefaultDataCountry: CountryType = {
  name: "Country",
  alpha: "global",
};

export default function Singup() {
  const [stateDropDownCountries, setStateDropDownCountries] = useState(false);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryType>(DefaultDataCountry);
  const [language, setLanguage] = useState("");
  const [dataForm, setDataForm] = useState<DataFormType>(DefaultDataForm);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      username: prevDataForm.username.replace(RegAnySpaces, "").toLowerCase(),
      password: prevDataForm.password.replace(RegAnySpaces, ""),
    }));
  }, [dataForm.username, dataForm.password]);

  // (() => {
  //   setDataForm(prevDataForm => ({...prevDataForm, username: prevDataForm.username}))
  // })();

  const handleForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;

    if (value == "language") {
    }

    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postUser = async () => {
    const dataJSON = localStorage.getItem("users");

    const { name, email, username, password, language, displaylanguage } =
      dataForm;
    const { alpha } = selectedCountry;

    const newuser = {
      [username]: {
        username: username,
        name: name,
        email: email,
        password: password,
        displaylanguage: displaylanguage,
        languages: {
          [language]: {
            name: language,
            country: alpha,
          },
        },
      },
    };

    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      console.log();

      if (data[username]) return false;
      const newData = { ...data, ...newuser };
      localStorage.setItem("users", JSON.stringify(newData));
      return true;
    }

    localStorage.setItem("users", JSON.stringify(newuser));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(dataForm).some((key) => dataForm[key] === ""))
      return alert("Empty input!");

    const status = await postUser();

    if (!status) {
      alert("User already exixts");
      return;
    }

    setSelectedCountry(DefaultDataCountry);
    setDataForm(DefaultDataForm);
  };

  const handleLanguageSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const { text } = e.target.selectedOptions[0];

    if (!value) {
      setCountries([]);
      setSelectedCountry(DefaultDataCountry);
      return;
    }
    const [data] = BingSupportedLanguages.filter((lang) => lang.code == value);
    const { countries } = data;
    setLanguage(text);
    setCountries(countries);
    setSelectedCountry(countries[0]);
  };

  return (
    <main className="flex min-h-full w-full flex-1 flex-col items-center bg-slate-900 px-8 pb-16 text-white">
      <h1 className="my-4 text-4xl font-bold">Sign Up</h1>
      <form className="flex w-full flex-col gap-6">
        {/* Language */}
        <div>
          <label
            htmlFor="language"
            className="mb-2 block text-sm font-medium text-white"
          >
            I want to learn:
          </label>

          <div className="flex flex-row">
            <select
              id="language"
              className="block h-12 w-full rounded-l-lg border border-l-2 border-gray-300 border-l-gray-100 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-l-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => {
                handleLanguageSelector(e);
                handleForm(e);
              }}
              name="language"
              value={dataForm.language}
            >
              <option value="">Choose a language</option>
              {BingSupportedLanguages.map((lang, key) => (
                <option
                  key={key}
                  value={lang.code}
                  onClick={() => setCountries(lang.countries)}
                >
                  {lang.lang}
                </option>
              ))}
            </select>

            <div className="relative flex w-max flex-col">
              <button
                id="states-button"
                data-dropdown-toggle="dropdown-states"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-r-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                type="button"
                onClick={() => setStateDropDownCountries((prev) => !prev)}
              >
                <Image
                  src={`/images/flags/${selectedCountry.alpha}.svg`}
                  width={20}
                  height={20}
                  alt={selectedCountry.name}
                />
                {selectedCountry.name}
                <DownArrow className="h-5 w-5" />
              </button>
              <div
                id="dropdown-states"
                className={`${
                  stateDropDownCountries ? "flex" : "hidden"
                } absolute right-0 top-14 min-w-max divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700`}
              >
                <ul
                  className="grid grid-cols-1 items-center justify-center py-2 text-sm text-gray-700 dark:text-gray-200 md:grid-cols-2"
                  aria-labelledby="states-button"
                >
                  {countries.map((count, key) => (
                    <li
                      className={`${countries.length == 1 ? "col-span-2" : ""}`}
                      key={key}
                      onClick={() => {
                        setStateDropDownCountries(false);
                        setSelectedCountry(count);
                      }}
                    >
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <div className="inline-flex items-center gap-2">
                          <Image
                            src={`/images/flags/${count.alpha}.svg`}
                            width={20}
                            height={20}
                            alt={count.name}
                          />
                          {count.name}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Display Language */}
        <div>
          <label
            htmlFor="displaylanguage"
            className="mb-2 block text-sm font-medium text-white"
          >
            From:
          </label>
          <select
            id="displaylanguage"
            name="displaylanguage"
            className="block h-12 w-full rounded-lg border border-gray-300 border-l-gray-100 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-l-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(e) => {
              handleLanguageSelector(e);
              handleForm(e);
            }}
            value={dataForm.displaylanguage}
          >
            <option value="">Choose your language</option>
            {BingSupportedLanguages.map((lang, key) => (
              <option
                key={key}
                value={lang.code}
                onClick={() => setCountries(lang.countries)}
              >
                {lang.lang}
              </option>
            ))}
          </select>
        </div>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            onChange={handleForm}
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder=""
            value={dataForm.name}
            required
          />
        </div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={handleForm}
            name="email"
            type="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="name@mail.com"
            value={dataForm.email}
            required
          />
        </div>
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            onChange={handleForm}
            name="username"
            type="text"
            id="username"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="@username"
            value={dataForm.username}
            required
          />
        </div>
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>

          <div className="flex">
            <input
              onChange={handleForm}
              value={dataForm.password}
              required
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
        {/* Submit */}
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Create account
        </button>
      </form>
    </main>
  );
}
