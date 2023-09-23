"use client";
import CheckIcon from "@/public/icons/CheckIcon";
import TagIcon from "@/public/icons/TagIcon";
import React, { useState } from "react";

const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export default function Add() {
  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState({
    title: "",
    text: "",
    author: "",
  });

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
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title || !data.text) {
      return alert("Lembre-se de adicionar um titulo e um texto.");
    }

    const iamgeSrc = await fetchImage(data.title);

    console.log({ ...data, iamgeSrc });
  };

  const handleClear = () => {
    setData({
      title: "",
      text: "",
      author: "",
    });
  };

  return (
    <>
      <h1 className="my-6  text-4xl font-bold text-white">Add</h1>
      <form className=" mb-6 flex w-full flex-col items-center justify-center space-y-6 px-8 md:px-16">
        <div className="w-full">
          <label
            htmlFor="large-input"
            className="mb-2 block text-lg font-medium text-white"
          >
            Title
          </label>
          <input
            value={data.title}
            onChange={handleData}
            required
            id="large-input"
            type="text"
            name="title"
            className="sm:text-md focs:ring-blue-500 block w-full rounded-lg  border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400  focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="text"
            className="mb-2 block text-lg font-medium  text-white"
          >
            Your text
          </label>
          <textarea
            onChange={handleData}
            value={data.text}
            required
            id="text"
            rows={4}
            name="text"
            className="block w-full rounded-lg border   border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter a text..."
          ></textarea>
        </div>

        <div className=" w-full">
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-medium  text-white"
          >
            Author
          </label>
          <div className="flex">
            <CheckIcon className="inline-flex h-12 w-12 items-center rounded-l-md border border-r-0  border-gray-600 bg-gray-600 px-1 text-sm text-gray-400" />
            <input
              onChange={handleData}
              value={data.author}
              type="text"
              id="author"
              name="author"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-600 bg-gray-700  p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-x-2 gap-y-3 md:flex-row">
          <div className="w-full">
            <label
              htmlFor="keyword"
              className="mb-2 block text-sm font-medium  text-white"
            >
              Image TAG
            </label>
            <div className="flex flex-row">
              <TagIcon className="inline-flex h-12 w-12 items-center rounded-l-md border border-r-0  border-gray-600 bg-gray-600 px-1 text-sm text-gray-400" />
              <input
                placeholder="Cleverly add a single word that better characterizes your text."
                onChange={handleData}
                value={data.author}
                type="text"
                id="keyword"
                name="keyword"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-600 bg-gray-700  p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className=" hidden h-16 items-end md:flex">
            <span className="text-xs text-white">OR</span>
          </div>

          <div className=" w-full">
            <label
              htmlFor="keyword"
              className="mb-2 block text-sm font-medium  text-white"
            >
              Image URL
            </label>
            <div className="flex flex-row">
              <CheckIcon className="inline-flex h-12 w-12 items-center rounded-l-md border border-r-0  border-gray-600 bg-gray-600 px-1 text-sm text-gray-400" />
              <input
                onChange={handleData}
                value={data.author}
                type="text"
                id="keyword"
                name="keyword"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-600 bg-gray-700  p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
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
            type="submit"
            className="h-8 w-24 rounded-2xl bg-blue-700 text-lg font-bold text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
