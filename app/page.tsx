"use client";
import { useEffect, useState } from "react";
import Flags from "./components/Flags";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/MainHeader";
import Footer from "./components/Footer";

export default function Home() {
  const [flags, setFlags] = useState(false);
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center h-[calc(100vh-100px)] overflow-auto dark:bg-gray-900 dark:text-white">
        <h1 className="mb-4 text-4xl text-center px-3 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Learn Languages
        </h1>
        <p className="mb-6 text-lg text-center px-3 font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          This is a free tool that can help you learn languages. Learn languages
          from Content You Love. The fast, fun and effective way to learn.
        </p>

        <div className="flex flex-col justify-center items-center mb-6">
          <Flags />
          <Image
            src="/images/plus.svg"
            alt="View more"
            width={32}
            height={32}
            className={`duration-150 ml-1 mt-3 ${flags ? "rotate-180" : ""}`}
            onClick={() => setFlags(!flags)}
          />
          {flags && (
            <p className="mb-6 text-xs text-center px-3 font-normal text-gray-500 lg:text-xs sm:px-16 xl:px-48 dark:text-gray-400">
              Mandarin Chinese, Spanish, English, Hindi, Bengali, Portuguese,
              Russian, Japanese, Western Punjabi, Marathi, Telugu, Wu Chinese,
              Turkish, Korean, French, German, Vietnamese, Tamil, Yue Chinese,
              Urdu, Javanese, Italian, Egyptian Arabic, Gujarati, Iranian
              Persian, Bhojpuri, Southern Min, Hakka, Jin Chinese, Hausa,
              Kannada, Indonesian, Polish, Yoruba, Xiang Chinese, Malayalam,
              Odia, Maithili, Burmese, Eastern Punjabi, Sunda, Sudanese Arabic,
              Algerian Arabic, Moroccan Arabic, Ukrainian, Igbo, Northern Uzbek,
              Sindhi, North Levantine Arabic, Romanian, Tagalog, Dutch, Saʽidi
              Arabic, Gan Chinese, Amharic, Northern Pashto, Magahi, Thai,
              Saraiki, Khmer, Chhattisgarhi, Somali, Malaysian, Cebuano, Nepali,
              Mesopotamian Arabic, Assamese, Sinhalese, Northern Kurdish, Hejazi
              Arabic, Nigerian Fulfulde, Bavarian, South Azerbaijani, Greek,
              Chittagonian, Kazakh, Deccan, Hungarian, Kinyarwanda, Zulu, South
              Levantine Arabic, Tunisian Arabic, Sanaani Spoken Arabic, Northern
              Min, Southern Pashto, Rundi, Czech, Taʽizzi-Adeni Arabic, Uyghur,
              Eastern Min, Sylheti
            </p>
          )}
        </div>

        <Link
          href="/learn"
          className="inline-flex items-center justify-center px-5 py-3 mb-6 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Start now
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </main>
      <Footer />
    </>
  );
}
//
