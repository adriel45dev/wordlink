"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface MobileIframeProps {
  from: string;
  to: string;
  text: string;
  translator: string;
}

const Linguee: { [key: string]: string } = {
  ["en"]: "english",
  ["de"]: "german",
  ["fr"]: "french",
  ["es"]: "spanish",
  ["zh"]: "chinese",
  ["ru"]: "russian",
  ["ja"]: "japanese",
  ["pt"]: "portuguese",
  ["it"]: "italian",
  ["nl"]: "dutch",
  ["pl"]: "polish",
  ["sv"]: "swedish",
  ["da"]: "danish",
  ["fi"]: "finnish",
  ["el"]: "greek",
  ["cs"]: "czech",
  ["ro"]: "romanian",
  ["hu"]: "hungarian",
  ["sk"]: "slovak",
  ["bg"]: "bulgarian",
  ["sl"]: "slovene",
  ["lt"]: "lithuanian",
  ["lv"]: "latvian",
  ["et"]: "estonian",
  ["mt"]: "maltese",
};

const Reverso: { [key: string]: string } = {
  ["ar"]: "ara",
  ["zh"]: "chi",
  ["cs"]: "cze",
  ["da"]: "dan",
  ["nl"]: "dut",
  ["en"]: "eng",
  ["fr"]: "fra",
  ["de"]: "ger",
  ["el"]: "gre",
  ["he"]: "heb",
  ["hi"]: "hin",
  ["hu"]: "hun",
  ["it"]: "ita",
  ["ja"]: "jpn",
  ["ko"]: "kor",
  ["fa"]: "per",
  ["pl"]: "pol",
  ["pt"]: "por",
  ["ro"]: "rum",
  ["ru"]: "rus",
  ["sk"]: "slo",
  ["es"]: "spa",
  ["sv"]: "swe",
  ["th"]: "tha",
  ["tr"]: "tur",
  ["uk"]: "ukr",
};
const ReversoContext: { [key: string]: string } = {
  ["ar"]: "arabic",
  ["cs"]: "czech",
  ["da"]: "danish",
  ["de"]: "german",
  ["el"]: "greek",
  ["en"]: "english",
  ["es"]: "spanish",
  ["fa"]: "persian",
  ["fr"]: "french",
  ["he"]: "hebrew",
  ["hi"]: "hindi",
  ["hu"]: "hungarian",
  ["it"]: "italian",
  ["ja"]: "japanese",
  ["ko"]: "korean",
  ["nl"]: "dutch",
  ["pl"]: "polish",
  ["pt"]: "portuguese",
  ["ro"]: "romanian",
  ["ru"]: "russian",
  ["sk"]: "slovak",
  ["sv"]: "swedish",
  ["th"]: "thai",
  ["tr"]: "turkish",
  ["uk"]: "ukrainian",
  ["zh"]: "chinese",
};
const MobileIframe = ({ from, to, text, translator }: MobileIframeProps) => {
  const translators = (
    from: string,
    to: string,
    text: string,
  ): { [key: string]: string } => {
    const encodeFrom = encodeURIComponent(from);
    const encodeTo = encodeURIComponent(to);
    const encodeText = encodeURIComponent(text);
    return {
      ["bing"]: `https://www.bing.com/translator?from=${encodeFrom}&to=${encodeTo}&text=${encodeText}`,
      ["deepl"]: `https://www.deepl.com/en/translator#${encodeFrom}/${encodeTo}/${encodeText}`,
      ["google"]: `https://translate.google.com/?from=${encodeFrom}&to=${encodeTo}&text=${encodeText}`,
      ["yandex"]: `https://translate.yandex.com/en/?source_lang=${encodeFrom}&target_lang=${encodeTo}&text=${encodeText}`,
      ["linguee"]: `https://www.linguee.com/${
        Linguee[encodeFrom] || "english"
      }-${
        Linguee[encodeTo] || "english"
      }/search?source=auto&query=${encodeText}`,
      ["reverso"]: `https://www.reverso.net/text-translation#sl=${
        Reverso[encodeFrom] || "eng"
      }&tl=${Reverso[encodeTo] || "eng"}&text=${encodeText}`,
      ["context"]: `https://context.reverso.net/translation/${
        ReversoContext[encodeFrom] || "english"
      }-${ReversoContext[encodeTo] || "english"}/${encodeText}`,
    };
  };

  return (
    <>
      <Link
        href={translators(from, to, text)[translator]}
        className="pb-2 hover:text-blue-500"
        target="_blank"
      >
        Open on {translator.charAt(0).toUpperCase() + translator.slice(1)}
      </Link>
      <iframe
        src={translators(from, to, text)[translator]}
        seamless
        title="Translator"
        className="flex h-96 w-full rounded-2xl "
      />
    </>
  );
};

export default MobileIframe;
