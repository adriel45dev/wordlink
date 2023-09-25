"use client";
import { LanguageContext } from "@/app/context/LanguageContext";
import { NavbarContext } from "@/app/context/NavbarContext";
import React, { useContext, useEffect, useState } from "react";
import Table from "./components/Table";
import { LanguageCodeReference } from "@/app/shared/enums/language-code-type";

export default function Vocabulary() {
  const { setTab } = useContext(NavbarContext);
  const { language } = useContext(LanguageContext);
  const [vocabulary, setVocabulary] = useState<{
    [key: string]: { des: string[]; state: string };
  }>({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTab("vocabulary"), []);

  useEffect(() => {
    const dataJSON = localStorage.getItem(
      `${LanguageCodeReference[language.selected]}_vocabulary`,
    );
    if (dataJSON) {
      setVocabulary(JSON.parse(dataJSON));
    }
  }, [language]);

  return (
    <>
      <h1 className="my-6 text-4xl font-bold text-white">Vocabulary</h1>
      <div className="flex w-full flex-1 flex-col items-center ">
        <Table vocabulary={vocabulary} />
      </div>
    </>
  );
}
