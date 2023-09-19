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
    <div className="flex-1 flex flex-col items-center px-16 py-6">
      <h1 className="font-extrabold text-4xl text-white my-3 text-center">
        {params.slug.replace("_", " ")}
      </h1>
      <h2 className="font-normal text-2xl text-white text-center">
        Unlocking the World through Language
      </h2>
      <div className="flex flex-row gap-2 my-4">
        <Badge
          state={EWordState.NEW}
          count={
            data.filter(
              (data) =>
                data.state == EWordState.NEW &&
                data.relation == EWordRelation.ANCHOR
            ).length
          }
        />
        <Badge
          state={EWordState.LINK}
          count={
            data.filter(
              (data) =>
                data.state == EWordState.LINK &&
                data.relation == EWordRelation.ANCHOR
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
            data.filter((data) => data.relation == EWordRelation.ANCHOR).length
          }
        />
      </div>
      <p className="text-white text-normal flex flex-row flex-wrap gap-x-2 gap-y-1 mt-8 px-8">
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
          )
        )}
      </p>
      <div className="flex flex-row justify-center items-center w-full m-8">
        <button
          type="button"
          className=" bg-white border focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 mt-8 mb-2 dark:bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
          onClick={() => setLinkState({})}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
