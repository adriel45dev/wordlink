"use client";

import ProfileIcon from "@/public/icons/ProfileIcon";
import React, { useContext, useEffect, useState } from "react";
import { RegAnySpaces } from "@/app/shared/Regex";
import ImageIcon from "@/public/icons/ImageIcon";
import Alert from "@/app/components/Alert";
import AlertType from "@/app/shared/enums/alert-type.enums";
import crypto from "crypto";
import AlertDataType from "@/app/shared/types/alert-data.types";
import PostDataType from "@/app/shared/types/post-data-types";
import { NavbarContext } from "@/app/context/NavbarContext";
import { UserContext } from "@/app/context/UserContext";

const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export default function Add() {
  const { setTab } = useContext(NavbarContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [AlertData, setAlertData] = useState<AlertDataType>({
    type: AlertType.Success,
    message: "",
    display: false,
  });

  const [input, setInput] = useState<PostDataType>({
    title: "",
    text: "",
    author: "",
    tag: "",
    id: "",
    image: "",
    language: "",
  });

  const [data, setData] = useState<{ [id: string]: PostDataType }>({});

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    const { language_key, username } = user;
    const dataJSON = localStorage.getItem(`${language_key}_${username}_posts`);
    if (dataJSON) {
      setData(JSON.parse(dataJSON));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const { language_key, username } = user;

    if (data) {
      const dataJSON = JSON.stringify(data);
      localStorage.setItem(`${language_key}_${username}_posts`, dataJSON);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => setTab("add"), [setTab]);

  async function fetchImage(query: string) {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&client_id=${ACCESS_KEY}`,
    );
    const data = await response.json();
    return data.urls.regular;
  }

  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setInput((prevData) => ({ ...prevData, [name]: value }));
    setAlertData((prevAlert) => ({ ...prevAlert, display: false }));
  };

  const handleDataTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value.replace(RegAnySpaces, "").toLowerCase(),
    }));
  };

  const clearForm = () => {
    setInput({
      title: "",
      text: "",
      author: "",
      tag: "",
      id: "",
      image: "",
      language: "",
    });
  };

  const isValidInputData = (): boolean => {
    if (!input.title || !input.text || !input.tag) {
      setAlertData({
        message:
          "To complete the post, put in a title, the content text, and a relevant tag.",
        type: AlertType.Warning,
        display: true,
      });
      setIsSubmitting(false);
      return false;
    }

    return true;
  };

  const postSuccess = (id: string) => {
    setAlertData({
      message: "New text added.",
      type: AlertType.Success,
      display: true,
      link: {
        label: "View post.",
        href: `/collection/library/reader/${id}`,
      },
    });

    clearForm();
    setIsSubmitting(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    // const { target_code, country_code } = user.currentlanguage;

    if (!isValidInputData()) return;

    setIsSubmitting(true);

    const image = await fetchImage(input.tag);

    const id = crypto.randomBytes(6).toString("hex");

    const newData = {
      ...input,
      id,
      image,
      language: user.language_key,
    };

    setData((prevData) => ({ ...prevData, [id]: newData }));

    postSuccess(id);
  };

  return (
    <>
      <h1 className="my-6 text-4xl font-bold text-white">Add</h1>
      {AlertData.display && (
        <div className="w-full px-8 md:px-16">
          <Alert data={{ AlertData, setAlertData }} />
        </div>
      )}
      <form className="mb-6 flex w-full flex-col items-center justify-center space-y-6 px-8 md:px-16">
        <div className="w-full">
          <label
            htmlFor="large-input"
            className="mb-2 block text-lg font-medium text-white"
          >
            Title
          </label>
          <input
            value={input.title}
            onChange={handleFormData}
            required
            id="large-input"
            type="text"
            name="title"
            className="sm:text-md focs:ring-blue-500 block w-full rounded-lg  border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400  focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <textarea
            onChange={handleFormData}
            value={input.text}
            required
            id="text"
            rows={4}
            name="text"
            className="block w-full rounded-lg border   border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter a text..."
          ></textarea>
        </div>

        <div className="w-full">
          <label
            htmlFor="tag"
            className="mb-2 block text-sm font-medium  text-white"
          >
            Image TAG
          </label>
          <div className="flex flex-row">
            <div className="inline-flex  items-center rounded-l-md border border-r-0 border-gray-600 bg-gray-600 px-1 text-sm text-gray-400">
              <ImageIcon className="h-6 w-6" />
            </div>
            <input
              onChange={handleDataTag}
              required
              value={input.tag}
              type="text"
              id="tag"
              name="tag"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-600 bg-gray-700  p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <span className="text-xs text-gray-400">
            * Cleverly add a <span className="font-bold">single word</span> that
            better characterizes your text.
          </span>
        </div>

        <div className=" w-full">
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-medium  text-white"
          >
            Author
          </label>
          <div className="flex">
            <div className="inline-flex  items-center rounded-l-md border border-r-0 border-gray-600 bg-gray-600 px-1 text-sm text-gray-400">
              <ProfileIcon className="h-6 w-6" />
            </div>
            <input
              onChange={handleFormData}
              value={input.author}
              type="text"
              id="author"
              name="author"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-600 bg-gray-700  p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <button
            type="button"
            className="h-8 w-24 rounded-2xl bg-slate-800 text-lg font-bold text-white hover:bg-slate-600"
            onClick={clearForm}
          >
            Clear
          </button>
          <button
            onClick={handleFormSubmit}
            disabled={isSubmitting}
            type="submit"
            className="h-8 w-24 rounded-2xl bg-blue-700 text-lg font-bold text-white hover:bg-blue-600"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
