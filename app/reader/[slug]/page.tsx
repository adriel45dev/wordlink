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

type TWord = {
  word: string;
  state: EWordState;
  id: number;
  type: EWordType;
};

export default function Reader({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<TWord[]>([]);

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
      };

      if (word.match(RegSymbols)) data.type = EWordType.PUNCTUATION;
      if (word.match(RegNumbers)) data.type = EWordType.NUMBER;

      return data;
    });

    const wordMap: { [key: string]: number } = {};

    mappedWords.forEach((obj) => {
      if (!wordMap[obj.word]) {
        wordMap[obj.word] = obj.id;
      } else {
        obj.id = wordMap[obj.word];
      }
    });

    return mappedWords;
  };

  useEffect(() => {
    setData(mapWords(text));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWord = (id: number) => {
    setData((prevData) =>
      prevData.map((w, i) => {
        if (w.id == id) return { ...w, state: EWordState.LINK };
        return w;
      })
    );
  };

  console.log("Window render");

  return (
    <div className="flex-1 flex flex-col  items-center px-16 py-6">
      <h1 className="font-extrabold text-4xl text-white my-3">
        {params.slug.replace("_", " ")}
      </h1>
      <div className="flex flex-row gap-2 my-4">
        <Badge state={EWordState.NEW} count={3} />
        <Badge state={EWordState.LINK} count={4} />
        <Badge state={EWordState.KNOWN} count={5} />
        <Badge state={EWordState.UNIQUE} count={6} />
      </div>
      <p className="text-white text-normal flex flex-row flex-wrap gap-x-2 gap-y-1 mt-8">
        {data.map((text, key) =>
          text.type == EWordType.TEXT ? (
            <span
              key={key}
              id={`word_${text.id}`}
              className={`rounded-xl p-1 ${EWordStateActive[text.state]}`}
              data-type={text.type}
              onClick={() => handleWord(text.id)}
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
      i
    </div>
  );
}
