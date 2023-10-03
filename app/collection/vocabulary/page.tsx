"use client";
import { NavbarContext } from "@/app/context/NavbarContext";
import React, { useContext, useEffect, useState } from "react";
import Table from "./components/Table";
import NoUserLogged from "@/app/components/NoUserLogged";
import { UserContext } from "@/app/context/UserContext";

export default function Vocabulary() {
  const { setTab } = useContext(NavbarContext);
  const [vocabulary, setVocabulary] = useState<{
    [key: string]: { des: string[]; state: string };
  }>({});
  const { user } = useContext(UserContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTab("vocabulary"), []);

  useEffect(() => {
    if (!user) return;
    const { language_key, username } = user;
    const dataJSON = localStorage.getItem(
      `${language_key}_${username}_vocabulary`,
    );

    if (dataJSON) {
      setVocabulary(JSON.parse(dataJSON));
    }
  }, [user]);

  if (!user) return <NoUserLogged />;

  return (
    <>
      <h1 className="my-6 text-4xl font-bold text-white">Vocabulary</h1>
      <div className="flex w-full flex-1 flex-col items-center ">
        <Table vocabulary={vocabulary} />
      </div>
    </>
  );
}
