import CheckIcon from "@/public/icons/CheckIcon";
import CloseIcon from "@/public/icons/CloseIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import React from "react";

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
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => handleUpdateState(text.word, WordLinkType.IGNORE)}
              className={`${
                text.state == WordLinkType.IGNORE
                  ? "bg-red-500"
                  : "bg-slate-700"
              } flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-red-500`}
            >
              <TrashIcon className="h-6 w-6" />
            </button>
            <span className="text-xs text-gray-400">Ignore</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => handleUpdateState(text.word, WordLinkType.LINK)}
              className={`${
                text.state == WordLinkType.LINK
                  ? "bg-yellow-600"
                  : "bg-slate-700"
              } flex h-12 w-12 items-center justify-center rounded-full  text-white hover:bg-slate-500`}
            >
              1
            </button>
            <span className="text-xs text-gray-400">New</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() =>
                handleUpdateState(text.word, WordLinkType.RECOGNIZED)
              }
              className={`${
                text.state == WordLinkType.RECOGNIZED
                  ? "bg-orange-500"
                  : "bg-slate-700"
              } flex h-12 w-12 items-center justify-center rounded-full  text-white hover:bg-slate-500`}
            >
              2
            </button>
            <span className="text-xs text-gray-400">Recognized</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() =>
                handleUpdateState(text.word, WordLinkType.FAMILIAR)
              }
              className={`${
                text.state == WordLinkType.FAMILIAR
                  ? "bg-lime-600"
                  : "bg-slate-700"
              } flex h-12 w-12 items-center justify-center rounded-full  text-white hover:bg-slate-500`}
            >
              3
            </button>
            <span className="text-xs text-gray-400">Familiar</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => handleUpdateState(text.word, WordLinkType.LEARNED)}
              className={`${
                text.state == WordLinkType.LEARNED
                  ? "bg-green-700"
                  : "bg-slate-700"
              } flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-slate-500`}
            >
              4
            </button>
            <span className="text-xs text-gray-400">Learned</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => handleUpdateState(text.word, WordLinkType.KNOWN)}
              className={`${
                text.state == WordLinkType.KNOWN
                  ? "bg-green-500"
                  : "bg-slate-700"
              } flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-green-500`}
            >
              <CheckIcon className="h-10 w-10 " />
            </button>
            <span className="text-xs text-gray-400">Known</span>
          </div>
        </div>
      </div>
    </div>
  );
}
