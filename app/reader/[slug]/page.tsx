import React from "react";
import Badge from "../components/Badge";

enum EBadges {
  NEW = "NEW",
  LINK = "LINK",
  KNOWN = "KNOWN",
  UNIQUE = "UNIQUE",
}

type TWord = {
  word: string;
  status: EBadges;
  id: number;
};

export default function Reader({ params }: { params: { slug: string } }) {
  const text = `English is a West Germanic language in the Indo-European language family. Originating in early medieval England, today English is both the most spoken language in the world and the third most spoken native language, after Mandarin Chinese and Spanish.`;

  function mapWords(str: string): TWord[] {
    type TWord = {
      word: string;
      status: EBadges;
      id: number;
    };

    const words = str.split(" ");

    const mappedWords: TWord[] = words.map((word, index) => {
      return {
        word,
        status: EBadges.NEW,
        id: index + 1,
      };
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
  }

  const data = mapWords(text);

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
        {data.map((text, key) => (
          <span
            key={key}
            id={`word_${text.id}`}
            className="bg-blue-600 rounded-xl px-2 py-1 hover:bg-blue-400"
          >
            {text.word}{" "}
          </span>
        ))}
      </p>
      i
    </div>
  );
}
