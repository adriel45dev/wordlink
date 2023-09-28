import React from "react";
import BingSupportedLanguages from "../shared/data/supported.lang";
import Image from "next/image";

export default function Languages() {
  return (
    <main className="flex min-h-screen w-full flex-1 flex-col items-center bg-slate-900 text-white">
      <h1 className="my-4 text-2xl font-bold">Languages</h1>
      <div className="flex w-full flex-col p-4">
        {BingSupportedLanguages.map((lang, i) => (
          <div key={i} className="my-2 flex w-full flex-row items-center gap-2">
            <span>{lang.lang} : </span>
            <div className="flex flex-row gap-2">
              {lang.countries.map((count, j) => (
                <div
                  key={j}
                  className="group flex flex-col items-center justify-center"
                >
                  <Image
                    src={`/images/flags/${count.alpha}.svg`}
                    width={200}
                    height={200}
                    alt={count.name}
                    className="h-8 w-8 hover:scale-125"
                  />
                  <span className="hidden text-xs group-hover:block">
                    {count.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
