"use client";

import { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import LibrarySection from "./components/LibrarySection";
import { NavbarContext } from "@/app/context/NavbarContext";

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

  const { setTab } = useContext(NavbarContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTab("library"), []);

  useEffect(() => {
    const dataJSON = localStorage.getItem("english_posts");
    if (dataJSON) {
      setData(JSON.parse(dataJSON));
    }

    // setData((prev) => ({ ...prev, ...POST_CARDS }));
  }, []);

  useEffect;
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
