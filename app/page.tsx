"use client";
import { useContext, useEffect, useState } from "react";
import Flags from "./components/Flags";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/MainHeader";
import Footer from "./components/Footer";
import ArrowRightIcon from "@/public/icons/ArrowRightIcon";

export default function Home() {
  const [flags, setFlags] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const dataJSON = localStorage.getItem("connected_user");
    if (dataJSON) return setUser(true);
  }, []);

  return (
    <>
      <Header />
      <main className="flex h-[calc(100vh-100px)] flex-col items-center justify-center overflow-auto dark:bg-gray-900 dark:text-white">
        <h1 className="mb-4 px-3 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Learn Languages
        </h1>
        <p className="mb-6 px-3 text-center text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          This is a free tool that can help you learn languages. Learn languages
          from Content You Love. The fast, fun and effective way to learn.
        </p>

        <div className="mb-6 flex flex-col items-center justify-center">
          <Flags />
          <Image
            src="/images/plus.svg"
            alt="View more"
            width={32}
            height={32}
            className={`ml-1 mt-3 duration-150 ${flags ? "rotate-180" : ""}`}
            onClick={() => setFlags(!flags)}
          />
          {flags && (
            <p className="mb-6 px-3 text-center text-xs font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xs xl:px-48">
              All languages Afrikaans, Albanian, Amharic, Arabic, Armenian,
              Assamese, Azerbaijani, Bangla, Bashkir, Basque, Bosnian,
              Bulgarian, Cantonese (Traditional), Catalan, Chinese (Literary),
              Chinese Simplified, Chinese Traditional, Croatian, Czech, Danish,
              Dari, Divehi, Dutch, English, Estonian, Faroese, Fijian, Filipino,
              Finnish, French, French (Canada), Galician , Ganda, Georgian,
              German, Greek, Gujarati, Haitian Creole, Hausa, Hebrew, Hindi,
              Hmong Daw, Hungarian, Icelandic, Igbo , Indonesian, Inuinnaqtun,
              Inuktitut, Inuktitut (Latin), Irish , Italian, Japanese, Kannada,
              Kazakh, Khmer, Kinyarwanda, Klingon (Latin), Konkani, Korean,
              Kurdish (Central), Kurdish (Northern), Kyrgyz, Lao, Latvian,
              Lingala, Lithuanian, Lower Sorbian, Macedonian, Maithili,
              Malagasy, Malay, Malayalam, Maltese, Marathi, Mongolian
              (Cyrillic), Mongolian (Traditional) , Myanmar (Burmese), Māori,
              Nepali, Norwegian, Nyanja, Odia, Pashto, Persian, Polish,
              Portuguese (Brazil), Portuguese (Portugal), Punjabi, Querétaro
              Otomi, Romanian, Rundi, Russian, Samoan, Serbian (Cyrillic),
              Serbian (Latin), Sesotho , Sesotho sa Leboa, Setswana, Shona,
              Sindhi, Sinhala, Slovak , Slovenian, Somali, Spanish, Swahili,
              Swedish, Tahitian, Tamil, Tatar, Telugu, Thai, Tibetan, Tigrinya,
              Tongan, Turkish, Turkmen, Ukrainian, Upper Sorbian, Urdu, Uyghur,
              Uzbek (Latin), Vietnamese, Welsh, Xhosa, Yoruba, Yucatec Maya,
              Zulu.
            </p>
          )}
        </div>

        <Link
          href={user ? "/collection/library" : "/accounts/signup"}
          className="mb-6 inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Start now
          <ArrowRightIcon className="h-6 w-6" />
        </Link>
      </main>
      <Footer />
    </>
  );
}
//
