import WordLinkType from "@/app/shared/enums/word-link-type.enums";
import ClockIcon from "@/public/icons/ClockIcon";
import LupaIcon from "@/public/icons/LupaIcon";
import React from "react";

enum WordLinkNumber {
  IGNORE = "-1",
  LINK = "1",
  RECOGNIZED = "2",
  FAMILIAR = "3",
  LEARNED = "4",
  KNOWN = "0",
  NEW = "",
}

type TableProps = {
  vocabulary: { [key: string]: { des: string[]; state: string } };
};

export default function Table({ vocabulary }: TableProps) {
  return (
    <div className="flex w-full flex-col gap-2 overflow-x-auto rounded-lg  px-16 py-4 shadow-md">
      <div className="flex w-full flex-row items-center justify-between rounded-lg bg-slate-800 px-4 py-2 text-white">
        <button>[ type ^]</button>
        <button>[ filter ^]</button>
      </div>
      <ul className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-slate-800 p-2 text-white">
        {Object.keys(vocabulary)
          .filter((e) => vocabulary[e].state != WordLinkType.IGNORE)
          .map((word, key) => {
            const { des, state } = vocabulary[word];
            return (
              <li
                key={key}
                className="flex w-full flex-row items-center gap-4 rounded-lg px-2 py-2 odd:bg-slate-900 even:bg-slate-700 hover:bg-blue-500"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 ">
                  {WordLinkNumber[state as WordLinkType]}
                </div>
                <div className="flex w-full flex-col justify-center">
                  <div className="text-lg font-bold">{word}</div>
                  <div className="flex flex-wrap text-sm text-slate-300">
                    {des.join("; ")}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
