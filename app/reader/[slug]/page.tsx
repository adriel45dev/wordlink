"use client";
import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import {
  RegSymbols,
  RegExtraSpaces,
  RegSymbolsEdge,
  RegNumbers,
} from "@/app/shared/Regex";
import { text } from "@/app/config";
import CloseIcon from "@/public/icons/CloseIcon";

text;

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
  state: EWordState;
  id: number;
  type: EWordType;
  relation: EWordRelation;
};

export default function Reader({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<TWord[]>([]);
  const [linkState, setLinkState] = useState<{ [key: string]: EWordState }>({});

  const [activeLink, setActiveLink] = useState("");

  const getState = () => {
    const dataJSON = localStorage.getItem("state_english");
    if (dataJSON) {
      setLinkState(JSON.parse(dataJSON));
    }
  };

  const postState = (word: string, state: EWordState) => {
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
        state: EWordState.NEW,
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

  const handleWord = (id: number, word: string, state: EWordState) => {
    postState(word, EWordState.LINK);
    setActiveLink(word.toLowerCase());
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
        <h1 className="my-3 text-center text-4xl font-extrabold text-white">
          {params.slug.replace("_", " ")}
        </h1>
        <h2 className="text-center text-2xl font-normal text-white">
          Unlocking the World through Language
        </h2>
        <div className="my-4 grid w-full grid-cols-2 place-items-center items-center justify-center gap-2 px-4 md:flex">
          <Badge
            state={EWordState.NEW}
            count={
              data.filter(
                (data) =>
                  data.state == EWordState.NEW &&
                  data.relation == EWordRelation.ANCHOR,
              ).length
            }
          />
          <Badge
            state={EWordState.LINK}
            count={
              data.filter(
                (data) =>
                  data.state == EWordState.LINK &&
                  data.relation == EWordRelation.ANCHOR,
              ).length
            }
          />
          <Badge
            state={EWordState.KNOWN}
            count={data.filter((data) => data.state == EWordState.KNOWN).length}
          />
          <Badge
            state={EWordState.UNIQUE}
            count={
              data.filter((data) => data.relation == EWordRelation.ANCHOR)
                .length
            }
          />
        </div>
        <p className="text-normal mt-4 flex w-full flex-wrap justify-stretch gap-x-2 gap-y-1 px-4 py-4 text-white md:mt-8 md:px-24">
          {data.map((text, key) =>
            text.type == EWordType.TEXT ? (
              <span
                key={key}
                id={`word_${text.id}`}
                className={`rounded-xl p-1 ${EWordStateActive[text.state]}`}
                data-type={text.type}
                onClick={() => handleWord(text.id, text.word, text.state)}
              >
                {text.word}{" "}
              </span>
            ) : (
              <span key={key} data-type={text.type}>
                {text.word}
              </span>
            ),
          )}
        </p>
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
      {activeLink && (
        <div className=" mb-8 flex min-h-full w-full flex-col items-center justify-center px-6 py-6 md:mb-0 md:w-96">
          <div className="relative flex w-full flex-col rounded-2xl border border-slate-700 px-4">
            <button
              className="absolute right-0 mx-4 my-2 flex items-center justify-center text-white"
              onClick={() => setActiveLink("")}
            >
              <CloseIcon className="h-8 w-8 hover:text-blue-500" />
            </button>
            <h2 className="py-4 text-center text-2xl font-bold text-white">
              {activeLink}
            </h2>

            <div className="flex w-full flex-col justify-center px-8 text-sm text-gray-300">
              <div className="text-white">1. Lorem, ipsum.</div>
              <div className="text-white">2. Dolor sit amet.</div>
            </div>

            <div className="my-2 flex w-full flex-row items-center justify-center gap-2 py-2">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500">
                1
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500">
                2
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500">
                3
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500">
                4
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-500">
                5
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
