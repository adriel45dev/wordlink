"use client";

import AddIcon from "@/public/icons/AddIcons";
import React, { useState } from "react";

type InputDescriptionProps = {
  word: string;
  handlePostDescription: (word: string, des: string) => void;
};

export default function InputDescription({
  word,
  handlePostDescription,
}: InputDescriptionProps) {
  const [inputDescription, setInputDescription] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDescription(e.target.value);
  };

  const postDescription = () => {
    handlePostDescription(word, inputDescription);
    setInputDescription("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      postDescription();
    }
  };

  return (
    <div className="my-3 flex w-full flex-col justify-center px-8 text-sm text-gray-300">
      <div className="flex w-full">
        <input
          type="text"
          className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-600 bg-gray-700  p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter a description"
          value={inputDescription}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <span
          onClick={() => postDescription()}
          className=" inline-flex items-center rounded-r-md border border-l-0 border-gray-600 bg-gray-600  px-3 text-sm text-gray-400"
        >
          <AddIcon className="h-8 w-8 hover:text-blue-500" />
        </span>
      </div>
    </div>
  );
}
