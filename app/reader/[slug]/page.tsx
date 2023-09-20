"use client";
import React, { useEffect, useState, Fragment } from "react";
import Badge from "../components/Badge";
import {
  RegSymbols,
  RegExtraSpaces,
  RegSymbolsEdge,
  RegNumbers,
} from "@/app/shared/Regex";
import { text } from "@/app/config";
import CloseIcon from "@/public/icons/CloseIcon";
import { log } from "console";
import CheckIcon from "@/public/icons/CheckIcon";
import TrashIcon from "@/public/icons/TrashIcon";

enum EWordState {
  NEW = "NEW",
  LINK = "LINK",
  KNOWN = "KNOWN",
  UNIQUE = "UNIQUE",
}

enum EWordStateActive {
  NEW = "bg-blue-600 hover:bg-blue-400",
  LINK = "bg-yellow-600 hover:bg-yellow-400",
  KNOWN = "bg-green-600 hover:bg-green-400",
  UNIQUE = "bg-gray-600 hover:bg-gray-400",
}

enum EWordStateLink {
  IGNORE = "IGNORE",
  NEW = "NEW",
  LINK = "LINK",
  RECOGNIZED = "RECOGNIZED",
  FAMILIAR = "FAMILIAR",
  LEARNED = "LEARNED",
  KNOWN = "KNOWN",
}

enum EWordStateLinkActive {
  IGNORE = "",
  NEW = "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 ",
  LINK = "bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-yellow-800 ",
  RECOGNIZED = "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-orange-800",
  FAMILIAR = "bg-opacity-90 bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-lime-800 shadow-lg shadow-lime-800/80",
  LEARNED = "bg-slate-800 hover:bg-slate-900 bg-opacity-85",
  KNOWN = "",
}

enum EWordType {
  NUMBER = "number",
  TEXT = "text",
  PUNCTUATION = "punctuation",
}

enum EWordRelation {
  ANCHOR,
  SIBLING,
}

type TWord = {
  word: string;
  state: EWordStateLink;
  id: number;
  type: EWordType;
  relation: EWordRelation;
};

export default function Reader({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<TWord[]>([]);
  const [linkState, setLinkState] = useState<{ [key: string]: EWordStateLink }>(
    {},
  );
  const [activeLink, setActiveLink] = useState<{
    active: string;
    index: number;
  }>();

  const getState = () => {
    const dataJSON = localStorage.getItem("state_english");
    if (dataJSON) {
      setLinkState(JSON.parse(dataJSON));
    }
  };

  const updateState = (word: string, state: EWordStateLink) => {
    const wordLow = word.toLowerCase();

    if (linkState[wordLow] == state) return;

    setLinkState((prev) => ({
      ...prev,
      [wordLow]: state,
    }));
  };

  const postState = (word: string, state: EWordStateLink) => {
    const wordLow = word.toLowerCase();

    if (!linkState[wordLow]) {
      setLinkState((prev) => ({
        ...prev,
        [wordLow]: state,
      }));
    }
  };
  const splitFormater = (str: string) => {
    return str
      .replace(RegSymbols, ` $& `)
      .replace(RegSymbolsEdge, ` $& `)
      .replace(RegExtraSpaces, " ")
      .trim()
      .split(" ");
  };

  const mapWords = (str: string): TWord[] => {
    const words = splitFormater(str);

    const mappedWords: TWord[] = words.map((word, index) => {
      const data = {
        word,
        state: EWordStateLink.NEW,
        id: index + 1,
        type: EWordType.TEXT,
        relation: EWordRelation.SIBLING,
      };

      const wordLow = word.toLowerCase();

      if (linkState[wordLow]) {
        data.state = linkState[wordLow];
      }

      if (word.match(RegSymbols)) data.type = EWordType.PUNCTUATION;
      if (word.match(RegNumbers)) data.type = EWordType.NUMBER;

      return data;
    });

    const wordMap: { [key: string]: number } = {};
    // [ipsum] : 1

    mappedWords.forEach((obj) => {
      const word = obj.word.toLowerCase();

      if (!wordMap[word]) {
        wordMap[word] = obj.id;
        obj.relation = EWordRelation.ANCHOR;
      } else {
        obj.id = wordMap[word];
      }
    });

    return mappedWords;
  };

  const handleWord = (
    id: number,
    word: string,
    state: EWordStateLink,
    index: number,
  ) => {
    postState(word, state);
    setActiveLink({ active: word, index: index });
  };

  useEffect(() => {
    getState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("state_english", JSON.stringify(linkState));
    setData(mapWords(text));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkState]);

  return (
    <section className="flex flex-1 flex-col md:flex-row">
      <div className="flex w-full flex-1 flex-col items-center py-6">
        {/* HEADING CARD  */}
        <h1 className="my-3 text-center text-4xl font-extrabold text-white">
          {params.slug.replace("_", " ")}
        </h1>
        <h2 className="text-center text-2xl font-normal text-white">
          Unlocking the World through Language
        </h2>

        {/* BADGES COUNT */}
        <div className="my-4 grid w-full grid-cols-2 place-items-center items-center justify-center gap-2 px-4 md:flex">
          <Badge
            state={EWordState.NEW}
            count={
              data.filter(
                (data) =>
                  data.state == EWordStateLink.NEW &&
                  data.relation == EWordRelation.ANCHOR,
              ).length
            }
          />
          <Badge
            state={EWordState.LINK}
            count={
              data.filter(
                (data) =>
                  data.state == EWordStateLink.LINK &&
                  data.relation == EWordRelation.ANCHOR,
              ).length
            }
          />
          <Badge
            state={EWordState.KNOWN}
            count={
              data.filter((data) => data.state == EWordStateLink.KNOWN).length
            }
          />
          <Badge
            state={EWordState.UNIQUE}
            count={
              data.filter((data) => data.relation == EWordRelation.ANCHOR)
                .length
            }
          />
        </div>

        {/* BOARD  */}
        <div className="text-normal mt-4 flex w-full flex-wrap justify-stretch gap-x-2 gap-y-1 px-4 py-4 text-white md:mt-8 md:px-24">
          {data.map((text, key) =>
            text.type == EWordType.TEXT ? (
              <Fragment key={key}>
                <div className="flex">
                  <span
                    className={`rounded-xl p-1 ${
                      EWordStateLinkActive[text.state]
                    }`}
                    onClick={() =>
                      handleWord(text.id, text.word, EWordStateLink.LINK, key)
                    }
                  >
                    {text.word}
                  </span>
                </div>

                {/* ACTIVE LINK CARD */}
                {activeLink?.index == key && (
                  <div className="my-2 block w-full rounded-2xl ">
                    <div className="relative flex w-full flex-col rounded-2xl border border-slate-700 px-4">
                      <button
                        className="absolute right-0 mx-4 my-2 flex items-center justify-center text-white"
                        onClick={() => setActiveLink({ active: "", index: -1 })}
                      >
                        <CloseIcon className="h-8 w-8 hover:text-blue-500" />
                      </button>
                      <h2 className="py-4 text-center text-2xl font-bold text-white">
                        {activeLink.active}
                      </h2>

                      <div className="flex w-full flex-col justify-center px-8 text-sm text-gray-300">
                        <div className="text-white">1. Lorem, ipsum.</div>
                        <div className="text-white">2. Dolor sit amet.</div>
                      </div>

                      <div className="my-2 flex w-full flex-row items-center justify-center gap-2 py-2">
                        <div className="flex flex-col items-center justify-center">
                          <button
                            onClick={() =>
                              updateState(text.word, EWordStateLink.IGNORE)
                            }
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-red-500"
                          >
                            <TrashIcon className="h-6 w-6" />
                          </button>
                          <span className="text-xs text-gray-400">Ignore</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <button
                            onClick={() =>
                              updateState(text.word, EWordStateLink.LINK)
                            }
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500"
                          >
                            1
                          </button>
                          <span className="text-xs text-gray-400">New</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <button
                            onClick={() =>
                              updateState(text.word, EWordStateLink.RECOGNIZED)
                            }
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500"
                          >
                            2
                          </button>
                          <span className="text-xs text-gray-400">
                            Recognized
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <button
                            onClick={() =>
                              updateState(text.word, EWordStateLink.FAMILIAR)
                            }
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500"
                          >
                            3
                          </button>
                          <span className="text-xs text-gray-400">
                            Familiar
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <button
                            onClick={() =>
                              updateState(text.word, EWordStateLink.LEARNED)
                            }
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500"
                          >
                            4
                          </button>
                          <span className="text-xs text-gray-400">Learned</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <button
                            onClick={() =>
                              updateState(text.word, EWordStateLink.KNOWN)
                            }
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-green-500"
                          >
                            <CheckIcon className="h-10 w-10 " />
                          </button>
                          <span className="text-xs text-gray-400">Known</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ) : (
              <span key={key} data-type={text.type}>
                {text.word}
              </span>
            ),
          )}
        </div>

        {/* CLEAR BUTTON */}
        <div className="m-8 flex w-full flex-row items-center justify-center">
          <button
            type="button"
            className="mb-2 mt-8 rounded-full border border-gray-600 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
            onClick={() => setLinkState({})}
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
