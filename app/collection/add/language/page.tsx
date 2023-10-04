"use client";
import Alert from "@/app/components/Alert";
import { NavbarContext } from "@/app/context/NavbarContext";
import { UserContext } from "@/app/context/UserContext";
import BingSupportedLanguages from "@/app/shared/data/supported.lang";
import AlertType from "@/app/shared/enums/alert-type.enums";
import AlertDataType from "@/app/shared/types/alert-data.types";
import DownArrow from "@/public/icons/DownArrow";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

type CountryType = {
  name: string;
  alpha: string;
};

type DataFormType = { [key: string]: string };

const DefaultDataForm: DataFormType = {
  language: "",
};

const DefaultDataCountry: CountryType = {
  name: "Country",
  alpha: "global",
};

type isDataFormEmptyType = { [key: string]: boolean };

const DefaultIsDataFormEmpty = {
  language: true,
};

export default function Language() {
  const { setTab } = useContext(NavbarContext);
  useEffect(() => setTab("add"), [setTab]);

  const [stateDropDownCountries, setStateDropDownCountries] = useState(false);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryType>(DefaultDataCountry);
  const [languageName, setLanguageName] = useState("");
  const [dataForm, setDataForm] = useState<DataFormType>(DefaultDataForm);
  const [AlertData, setAlertData] = useState<AlertDataType>({
    type: AlertType.Success,
    message: "",
    display: false,
  });

  const [dataFormStatus, setDataFormStatus] = useState<isDataFormEmptyType>(
    DefaultIsDataFormEmpty,
  );

  const { user, setUser } = useContext(UserContext);

  const handleForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setAlertData((alert) => ({ ...alert, display: false }));
    setDataFormStatus(DefaultIsDataFormEmpty);
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    setLanguageName(text);
    setCountries(countries);
    setSelectedCountry(countries[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!dataForm.language) {
      setAlertData({
        type: AlertType.Warning,
        message:
          "Oops! It looks like you forgot to fill out one of the required fields. Please enter the missing information before sending your request.",
        display: true,
      });
      return;
    }

    const { language } = dataForm;
    const { alpha } = selectedCountry;

    if (user.languages[`${language}_${alpha}`]) {
      return setAlertData({
        type: AlertType.Info,
        message: `This language is already in your list of languages. You have already added (${languageName} - ${alpha.toUpperCase()}) as one of your languages on your profile. To edit or update your list of languages, go to your profile and select the languages option.`,
        display: true,
      });
    }

    const newLanguage = {
      [`${language}_${alpha}`]: {
        name: languageName,
        code: language,
        country: alpha,
      },
    };

    setUser({
      ...user,
      languages: {
        ...user.languages,
        ...newLanguage,
      },
    });

    setSelectedCountry(DefaultDataCountry);
    setDataForm(DefaultDataForm);

    setAlertData({
      type: AlertType.Success,
      message: "New language added.",
      display: true,
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-8 md:px-16">
      <h1 className="my-6 text-4xl font-bold text-white">Language</h1>
      {AlertData.display && (
        <div className="w-full">
          <Alert data={{ AlertData, setAlertData }} />
        </div>
      )}
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
              className={`${
                dataFormStatus.language
                  ? "dark:border-gray-600"
                  : "dark:border-red-600"
              } block w-full rounded-l-lg border border-l-2 border-gray-300 border-l-gray-100 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
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

        {/* Submit */}
        <button
          type="button"
          className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
          onClick={handleSubmit}
        >
          Add language
        </button>
      </form>
    </div>
  );
}
