import CheckIcon from "@/public/icons/CheckIcon";
import CloseIcon from "@/public/icons/CloseIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import React from "react";
import ButtonWordState from "./ButtonWordState";

type TActiveLink = {
  active: string;
  index: number;
};

enum WordLinkType {
  IGNORE = "IGNORE",
  NEW = "NEW",
  LINK = "LINK",
  RECOGNIZED = "RECOGNIZED",
  FAMILIAR = "FAMILIAR",
  LEARNED = "LEARNED",
  KNOWN = "KNOWN",
}

type TWord = {
  word: string;
  state: WordLinkType;
  id: number;
  type: EWordType;
  relation: EWordRelation;
};

enum EWordType {
  NUMBER = "number",
  TEXT = "text",
  PUNCTUATION = "punctuation",
}

enum EWordRelation {
  ANCHOR,
  SIBLING,
}

type WordStateControllerProps = {
  handleSetActiveLink: (value: TActiveLink) => void;
  handleUpdateState: (word: string, state: WordLinkType) => void;
  activeLink: TActiveLink;
  text: TWord;
};

export default function WordStateController({
  handleSetActiveLink,
  handleUpdateState,
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

        <h2 className="py-4 text-center text-2xl font-bold text-white">
          {activeLink.active}
        </h2>

        {/* DESCRIPTION */}
        <div className="flex w-full flex-col justify-center px-8 text-sm text-gray-300">
          <div className="text-white">1. Lorem, ipsum.</div>
          <div className="text-white">2. Dolor sit amet.</div>
        </div>

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
