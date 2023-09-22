"use client";
import { text } from "@/app/config";
import React, { useEffect, useState, Fragment } from "react";
import Badge from "../components/Badge";
import WordStateController from "../components/WordStateController";
import Heading from "../components/Heading";
import WordBadgeType from "@/app/shared/enums/word-badge-type.enums";
import WordLinkType from "@/app/shared/enums/word-link-type.enums";
import TWord from "@/app/shared/types/word.types";
import EWordRelation from "@/app/shared/enums/word-relation-type.enums";
import EWordType from "@/app/shared/enums/word-type.enums";
import TActiveLink from "@/app/shared/types/active-link.types";
import TWordsListLink from "@/app/shared/types/list-words-link.types";
import Audio from "@/app/components/Audio";
import {
  RegSymbols,
  RegExtraSpaces,
  RegSymbolsEdge,
  RegNumbers,
} from "@/app/shared/Regex";
import SpeechComponent from "../components/SpeechComponent";

enum WordLinkVisualStyle {
  IGNORE = "",
  NEW = "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 ",
  LINK = "bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-yellow-800 ",
  RECOGNIZED = "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-orange-800",
  FAMILIAR = "bg-opacity-90 bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-lime-800 shadow-lg shadow-lime-800/80",
  LEARNED = "bg-slate-800 hover:bg-slate-900 bg-opacity-85",
  KNOWN = "",
}

export default function Reader({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<TWord[]>([]);
  const [listWordsLink, setlistWordsLink] = useState<TWordsListLink>({});

  const [activeLink, setActiveLink] = useState<TActiveLink>();

  const getState = () => {
    const dataJSON = localStorage.getItem("state_english");
    if (dataJSON) {
      setlistWordsLink(JSON.parse(dataJSON));
    }
  };

  const updateState = (word: string, state: WordLinkType) => {
    const wordLow = word.toLowerCase();

    if (listWordsLink[wordLow].state == state) return;

    setlistWordsLink((prev) => ({
      ...prev,
      [wordLow]: { ...listWordsLink[wordLow], state },
    }));
  };

  const postState = (word: string, state: WordLinkType) => {
    const wordLow = word.toLowerCase();

    if (!listWordsLink[wordLow]) {
      setlistWordsLink((prev) => ({
        ...prev,
        [wordLow]: { des: [], state },
      }));
    }
  };

  const postDescription = (word: string, des: string) => {
    if (!des) return;
    const wordLow = word.toLowerCase();
    if (listWordsLink[wordLow]) {
      setlistWordsLink((prev) => ({
        ...prev,
        [wordLow]: {
          ...listWordsLink[wordLow],
          des: [...listWordsLink[wordLow].des, des],
        },
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
        state: WordLinkType.NEW,
        id: index + 1,
        type: EWordType.TEXT,
        relation: EWordRelation.SIBLING,
        description: [""],
      };

      data.description = [];

      const wordLow = word.toLowerCase();

      if (listWordsLink[wordLow]) {
        data.state = listWordsLink[wordLow].state;

        data.description = [...(listWordsLink[wordLow].des || "")];
        // data.description = ["Descriprion 1...", "Description 2..."];
      }

      if (word.match(RegSymbols)) data.type = EWordType.PUNCTUATION;
      if (word.match(RegNumbers)) data.type = EWordType.NUMBER;

      return data;
    });

    const wordMap: { [key: string]: number } = {};

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

  const onWord = (
    id: number,
    word: string,
    state: WordLinkType,
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
    localStorage.setItem("state_english", JSON.stringify(listWordsLink));
    setData(mapWords(text));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listWordsLink]);

  return (
    <section className="flex flex-1 flex-col md:flex-row">
      <div className="flex w-full flex-1 flex-col items-center py-6">
        {/* HEADING CARD  */}
        <Heading slug={params.slug} />

        {/* BADGES COUNT */}
        <div className="my-4 grid w-full grid-cols-2 place-items-center items-center justify-center gap-2 px-4 md:flex">
          <Badge
            state={WordBadgeType.NEW}
            count={
              data.filter(
                (data) =>
                  data.state == WordLinkType.NEW &&
                  data.relation == EWordRelation.ANCHOR,
              ).length
            }
          />
          <Badge
            state={WordBadgeType.LINK}
            count={
              data.filter(
                (data) =>
                  data.state !== WordLinkType.IGNORE &&
                  data.state !== WordLinkType.NEW &&
                  data.state !== WordLinkType.KNOWN &&
                  data.relation == EWordRelation.ANCHOR,
              ).length
            }
          />
          <Badge
            state={WordBadgeType.KNOWN}
            count={
              data.filter(
                (data) =>
                  data.state == WordLinkType.KNOWN &&
                  data.relation == EWordRelation.ANCHOR,
              ).length
            }
          />
          <Badge
            state={WordBadgeType.UNIQUE}
            count={
              data.filter((data) => data.relation == EWordRelation.ANCHOR)
                .length
            }
          />
        </div>

        {/* PLAY */}
        <div className="flex w-full items-center justify-center">
          <SpeechComponent text={text} />
          <Audio text={text} />
        </div>

        {/* BOARD  */}
        <div className="text-normal flex w-full flex-wrap justify-stretch gap-x-2 gap-y-1 px-4 py-4 text-white md:px-24">
          {data.map((text, key) =>
            text.type == EWordType.TEXT ? (
              <Fragment key={key}>
                <div className="flex">
                  <span
                    className={`rounded-xl p-1 ${
                      WordLinkVisualStyle[text.state]
                    }`}
                    onClick={() =>
                      onWord(text.id, text.word, WordLinkType.LINK, key)
                    }
                  >
                    {text.word}
                  </span>
                </div>

                {/* ACTIVE LINK CARD */}
                {activeLink?.index == key && (
                  <WordStateController
                    text={text}
                    activeLink={activeLink}
                    handleUpdateState={updateState}
                    handleSetActiveLink={setActiveLink}
                    handlePostDescription={postDescription}
                  />
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
            onClick={() => setlistWordsLink({})}
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
