"use client";

import { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import LibrarySection from "./components/LibrarySection";
import { NavbarContext } from "@/app/context/NavbarContext";
import { LanguageCodeReference } from "@/app/shared/enums/language-code-type";
import { LanguageContext } from "@/app/context/LanguageContext";
import { UserContext } from "@/app/context/UserContext";
import NoUserLogged from "@/app/components/NoUserLogged";
import { useRouter } from "next/navigation";
import { UserLogginContext } from "@/app/context/UserLoggingContext";

type DataType = {
  title: string;
  text: string;
  author: string;
  tag: string;
  id: string;
  image: string;
};

export default function Learn() {
  const [data, setData] = useState<{ [id: string]: DataType }>({});
  // const { language } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const { isUser } = useContext(UserLogginContext);

  const { setTab } = useContext(NavbarContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTab("library"), []);

  useEffect(() => {
    if (!user || !isUser) return;
    const { target_code, country_code } = user.currentlanguage;
    const { username } = user;
    const dataJSON = localStorage.getItem(
      `${target_code}_${country_code}_${username}_posts`,
    );
    if (dataJSON) {
      setData(JSON.parse(dataJSON));
    } else {
      setData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!isUser) return <></>;

  return (
    <>
      <h1 className="my-6 text-4xl font-bold text-white">Library</h1>

      {/* Mini Stories */}
      {/* <LibrarySection title="Mini Stories">
        <></>
      </LibrarySection> */}

      {/* Continue Studying */}
      {/* <LibrarySection title="Continue Studying">
        <></>
      </LibrarySection> */}

      {/* Last Added */}
      {data && (
        <LibrarySection title="Last Added">
          {Object.keys(data).map((id, key) => {
            const card = data[id];
            return <Card key={key} data={card} />;
          })}
        </LibrarySection>
      )}
    </>
  );
}
