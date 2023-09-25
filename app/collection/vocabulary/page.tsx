"use client";
import { NavbarContext } from "@/app/context/NavbarContext";
import React, { useContext, useEffect } from "react";

export default function Vocabulary() {
  const { setTab } = useContext(NavbarContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTab("vocabulary"), []);
  return (
    <>
      <h1 className="my-6 text-4xl font-bold text-white">Vocabulary</h1>
    </>
  );
}
