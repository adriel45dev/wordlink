"use client";
import { createContext, useState, useEffect } from "react";
import { LanguageCode, Language } from "../shared/enums/language-code-type";

type LanguageType = {
  selected: LanguageCode;
  languages: { [code: string]: Language };
};

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

export const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType,
);

export const LanguageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<LanguageType>({
    selected: LanguageCode.en,
    languages: {
      [LanguageCode.en]: Language.English,
      [LanguageCode.pt]: Language.Portuguese,
    },
  });

  useEffect(() => {
    const dataJSON = localStorage.getItem("languages");
    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      setLanguage(data as LanguageType);
    }
  }, []);

  useEffect(() => {
    const newDataJSON = JSON.stringify(language);
    const dataJSON = localStorage.getItem("languages");

    if (dataJSON) {
      localStorage.setItem("languages", newDataJSON);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
