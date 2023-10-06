"use client";

import CheckIcon from "@/public/icons/CheckIcon";
import CloseIcon from "@/public/icons/CloseIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import React, { useContext, useState } from "react";
import ButtonWordState from "./ButtonWordState";
import WordLinkType from "@/app/shared/enums/word-link-type.enums";
import TWord from "@/app/shared/types/word.types";
import TActiveLink from "@/app/shared/types/active-link.types";
import InputDescription from "./InputDescription";
import Player from "@/app/components/Player";
import MobileIframe from "@/app/components/MobileIframe";
import { UserContext } from "@/app/context/UserContext";

type WordStateControllerProps = {
  text: TWord;
  activeLink: TActiveLink;
  handleSetActiveLink: (value: TActiveLink) => void;
  handleUpdateState: (word: string, state: WordLinkType) => void;
  handlePostDescription: (word: string, des: string) => void;
};

export default function WordStateController({
  handleSetActiveLink,
  handleUpdateState,
  handlePostDescription,
  activeLink,
  text,
}: WordStateControllerProps) {
  const { user } = useContext(UserContext);
  const [translator, setTranslator] = useState("bing");

  if (!user) return <></>;
  const { target_code, display_code } = user.currentlanguage;

  const handleTranslator = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(value);
    setTranslator(value);
  };

  return (
    <div className="my-2 min-w-full flex-1 rounded-2xl">
      <div className="relative flex w-full flex-col rounded-2xl border border-slate-700 px-4">
        <button
          className="absolute right-0 mx-4 my-2 flex items-center justify-center text-white"
          onClick={() => handleSetActiveLink({ active: "", index: -1 })}
        >
          <CloseIcon className="h-8 w-8 hover:text-blue-500" />
        </button>

        <div className="flex w-full flex-row items-center justify-center gap-4 py-2">
          <Player text={text.word} />
          <h2 className="text-2xl font-bold text-white">{activeLink.active}</h2>
        </div>

        {/* DESCRIPTION */}
        <div className="text-normal flex w-full flex-col justify-center px-8 text-gray-300">
          {text.description.map((description, key) => (
            <div key={key} className="text-white">
              {`${key + 1}. `} {description}
            </div>
          ))}
        </div>

        {/* IUNPUT DESCRIPTION */}
        <InputDescription
          handlePostDescription={handlePostDescription}
          word={text.word}
        />
        {/* BUTTON ACTIONS */}
        <div className="my-2 flex max-w-full flex-row flex-wrap items-center justify-center gap-2 py-2">
          <ButtonWordState
            label="Ignore"
            state={text.state}
            word={text.word}
            type={WordLinkType.IGNORE}
            handleUpdateState={handleUpdateState}
          >
            <TrashIcon className="h-6 w-6" />
          </ButtonWordState>

          <ButtonWordState
            content="1"
            label="New"
            state={text.state}
            word={text.word}
            type={WordLinkType.LINK}
            handleUpdateState={handleUpdateState}
          />

          <ButtonWordState
            content="2"
            label="Recognized"
            state={text.state}
            word={text.word}
            type={WordLinkType.RECOGNIZED}
            handleUpdateState={handleUpdateState}
          />

          <ButtonWordState
            content="3"
            label="Familiar"
            state={text.state}
            word={text.word}
            type={WordLinkType.FAMILIAR}
            handleUpdateState={handleUpdateState}
          />

          <ButtonWordState
            content="4"
            label="Learned"
            state={text.state}
            word={text.word}
            type={WordLinkType.LEARNED}
            handleUpdateState={handleUpdateState}
          />

          <ButtonWordState
            label="Known"
            state={text.state}
            word={text.word}
            type={WordLinkType.KNOWN}
            handleUpdateState={handleUpdateState}
          >
            <CheckIcon className="h-10 w-10 " />
          </ButtonWordState>
        </div>

        {/* ${encodeURIComponent( */}

        <div className="w-full p-4">
          <label htmlFor="translator_select" className="sr-only">
            Translator select
          </label>
          <select
            value={translator}
            onChange={handleTranslator}
            id="translator_select"
            className="peer block w-full appearance-none space-x-2 border-0 border-b-2 border-gray-200  bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
          >
            <option value="bing" className="bg-slate-800 text-white ">
              Bing Translate
            </option>
            <option value="linguee" className="bg-slate-800 text-white">
              Linguee
            </option>
            <option value="reverso" className="bg-slate-800 text-white">
              Reverso Translate
            </option>
            <option value="context" className="bg-slate-800 text-white">
              Reverso Context
            </option>
            <option value="google" className="bg-slate-800 text-white">
              Google Translate
            </option>
            <option value="deepl" className="bg-slate-800 text-white">
              Deepl Translate
            </option>

            <option value="yandex" className="bg-slate-800 text-white">
              Yandex Translate
            </option>
          </select>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center p-4">
          <MobileIframe
            from={target_code}
            to={display_code}
            text={text.word}
            translator={translator}
          />
        </div>
      </div>
    </div>
  );
}
