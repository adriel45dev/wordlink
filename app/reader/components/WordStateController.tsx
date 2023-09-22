import CheckIcon from "@/public/icons/CheckIcon";
import CloseIcon from "@/public/icons/CloseIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import React, { useState } from "react";
import ButtonWordState from "./ButtonWordState";
import WordLinkType from "@/app/shared/enums/word-link-type.enums";
import TWord from "@/app/shared/types/word.types";
import TActiveLink from "@/app/shared/types/active-link.types";
import AddIcon from "@/public/icons/AddIcons";
import InputDescription from "./InputDescription";
import SpeechComponent from "./SpeechComponent";
import Audio from "@/app/components/Audio";

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
          <Audio text={text.word} />
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
        <div className="my-2 flex w-full flex-row flex-wrap items-center justify-center gap-2 py-2">
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
      </div>
    </div>
  );
}
