import WordLinkType from "@/app/shared/enums/word-link-type.enums";
import React from "react";

type ButtonWordStateProps = {
  children?: React.ReactNode;
  content?: string;
  label: string;
  state: WordLinkType;
  word: string;
  type: WordLinkType;
  handleUpdateState: (word: string, state: WordLinkType) => void;
};

enum WordlinkStyle {
  IGNORE = "bg-red-500",
  NEW = "",
  LINK = "bg-yellow-600",
  RECOGNIZED = "bg-orange-500",
  FAMILIAR = "bg-lime-600",
  LEARNED = "bg-green-700",
  KNOWN = "bg-green-500",
}

enum WordlinkStyleHover {
  IGNORE = "hover:bg-red-500",
  NEW = "",
  LINK = "hover:bg-yellow-600",
  RECOGNIZED = "hover:bg-orange-500",
  FAMILIAR = "hover:bg-lime-600",
  LEARNED = "hover:bg-green-700",
  KNOWN = "hover:bg-green-500",
}

export default function ButtonWordState({
  children,
  content,
  label,
  state,
  word,
  type,
  handleUpdateState,
}: ButtonWordStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => handleUpdateState(word, type)}
        className={`${
          state == type ? WordlinkStyle[state] : "bg-slate-700"
        } flex h-12 w-12 items-center justify-center rounded-full text-white ${
          WordlinkStyleHover[type]
        }`}
      >
        {content}
        {children}
      </button>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}
