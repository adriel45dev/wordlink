"use client";
import React from "react";
import Badge from "../components/Badge";
import {
  RegSymbols,
  RegExtraSpaces,
  RegSymbolsEdge,
  RegNumbers,
} from "@/app/shared/Regex";
import { spawn } from "child_process";

enum EBadges {
  NEW = "NEW",
  LINK = "LINK",
  KNOWN = "KNOWN",
  UNIQUE = "UNIQUE",
}
enum EWordType {
  NUMBER = "number",
  TEXT = "text",
  PUNCTUATION = "punctuation",
}

type TWord = {
  word: string;
  status: EBadges;
  id: number;
  type: EWordType;
};

export default function Reader({ params }: { params: { slug: string } }) {
  const text = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, ab. Ea enim doloremque iste sunt cupiditate autem tenetur, eum rem placeat incidunt magnam dicta quas a eaque consequatur est. Quas cupiditate velit enim, quae saepe placeat nulla culpa nam aperiam, quam repudiandae dolorum modi vel pariatur quis nihil numquam doloremque corrupti. Dolores doloremque ut corporis sequi et aliquam iste minima repellendus natus beatae, eaque voluptatem commodi, obcaecati voluptates saepe similique perspiciatis possimus corrupti! Vitae nisi similique, explicabo autem suscipit minus numquam eligendi eaque et molestiae repudiandae cum harum modi illo quisquam maxime, dignissimos debitis, expedita quasi? Cumque expedita odit provident repudiandae voluptatibus totam porro quod architecto! Quo odio debitis enim molestiae. Atque, ut optio error autem excepturi maiores obcaecati a dignissimos tenetur rem mollitia, qui exercitationem harum ad voluptas alias maxime laborum et illo delectus laboriosam reprehenderit! Deserunt nostrum eos odit voluptatum rerum itaque harum quos temporibus quis quia a unde officia quaerat, necessitatibus id. Consequuntur dignissimos cumque odit vero minus fugiat tempora deleniti sapiente, nobis, atque qui. Ex dicta quae soluta similique laboriosam ab provident animi dolor, veniam voluptas magni quam ea facilis quo blanditiis eum iusto commodi autem dolorum magnam rem aut deserunt vitae! Eius deserunt blanditiis voluptates? 1997`;

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
        status: EBadges.NEW,
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

  const data = mapWords(text);

  const handleWord = (id: number) => {
    console.log(id);

    document
      .querySelectorAll(`#word_${id}`)
      .forEach((w) => w.classList.toggle("bg-yellow-600"));
  };

  return (
    <div className="flex-1 flex flex-col  items-center px-16 py-6">
      <h1 className="font-extrabold text-4xl text-white my-3">
        {params.slug.replace("_", " ")}
      </h1>
      <div className="flex flex-row gap-2 my-4">
        <Badge badge={EBadges.NEW} count={3} />
        <Badge badge={EBadges.LINK} count={4} />
        <Badge badge={EBadges.KNOWN} count={5} />
        <Badge badge={EBadges.UNIQUE} count={6} />
      </div>
      <p className="text-white text-normal flex flex-row flex-wrap gap-x-2 gap-y-1 mt-8">
        {data.map((text, key) =>
          text.type == EWordType.TEXT ? (
            <span
              key={key}
              id={`word_${text.id}`}
              className="bg-blue-600 rounded-xl p-1 hover:bg-blue-400"
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
