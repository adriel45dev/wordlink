"use client";

import ProfileIcon from "@/public/icons/ProfileIcon";
import React, { useEffect, useState } from "react";
import { RegAnySpaces } from "../shared/Regex";
import ImageIcon from "@/public/icons/ImageIcon";
import Alert from "../components/Alert";
import AlertType from "../shared/enums/alert-type.enums";
import crypto from "crypto";

const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

type AlertDataType = {
  type: AlertType;
  message: string;
  display: boolean;
  link?: {
    label: string;
    href: string;
  };
};

type DataType = {
  title: string;
  text: string;
  author: string;
  tag: string;
  id: string;
  image: string;
};

export default function Add() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [AlertData, setAlertData] = useState<AlertDataType>({
    type: AlertType.Success,
    message: "",
    display: false,
  });
  const [input, setInput] = useState<DataType>({
    title: "",
    text: "",
    author: "",
    tag: "",
    id: "",
    image: "",
  });

  const [data, setData] = useState<{ [id: string]: DataType }>({});

  useEffect(() => {
    const dataJSON = localStorage.getItem("english_posts");
    if (dataJSON) {
      setData(JSON.parse(dataJSON));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const dataJSON = JSON.stringify(data);
      localStorage.setItem("english_posts", dataJSON);
    }
  }, [data]);

  async function fetchImage(query: string) {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&client_id=${ACCESS_KEY}`,
    );
    const data = await response.json();
    return data.urls.regular;
  }

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDataTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value.replace(RegAnySpaces, ""),
    }));
  };

  const handleClear = () => {
    setInput({
      title: "",
      text: "",
      author: "",
      tag: "",
      id: "",
      image: "",
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

  const onSuccess = (id: string) => {
    setAlertData({
      message: "New text added.",
      type: AlertType.Success,
      display: true,
      link: {
        label: "View post.",
        href: `../reader/${id}`,
      },
    });

    handleClear();
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidInputData()) return;

    setIsSubmitting(true);

    const image = await fetchImage(input.tag);

    const id = crypto.randomBytes(6).toString("hex");

    const newData = { ...input, id, image };

    setData((prevData) => ({ ...prevData, [id]: newData }));

    onSuccess(id);
  };

  console.log(data);

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
            onChange={handleData}
            required
            id="large-input"
            type="text"
            name="title"
            className="sm:text-md focs:ring-blue-500 block w-full rounded-lg  border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400  focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <textarea
            onChange={handleData}
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
              onChange={handleData}
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
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
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
