"use client";
import BackIcon from "@/public/icons/BackIncon";
import NextIcon from "@/public/icons/NextIcon";
import React, { Children, useState } from "react";

type LibrarySectionProps = {
  children: React.ReactNode;
  title: string;
};

export default function LibrarySection({
  children,
  title,
}: LibrarySectionProps) {
  const [startIndex, setStarIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [index, setIndex] = useState(0);

  const itemCount = Children.count(children);
  const LIMIT_END_INDEX = Math.round(itemCount / 5 + 0.4) * 5;
  const LIMIT_START_INDEX = LIMIT_END_INDEX - 5;

  const handleNext = () => {
    setStarIndex((prev) => (prev + 5 > LIMIT_START_INDEX ? 0 : prev + 5));
    setEndIndex((prev) => (prev + 5 > LIMIT_END_INDEX ? 5 : prev + 5));
    setIndex((prev) => (prev + 1) % itemCount);
  };

  const handlePrevious = () => {
    setStarIndex((prev) => (prev - 5 < 0 ? LIMIT_START_INDEX : prev - 5));
    setEndIndex((prev) => (prev - 5 < 5 ? LIMIT_END_INDEX : prev - 5));
    setIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  return (
    <section className="w-full h-full px-8 my-6 flex justify-center items-center gap-2 select-none">
      <BackIcon
        className="text-white w-6 h-6 hover:scale-125"
        onClick={handlePrevious}
      />

      {/* CONTAINER CARD */}
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl text-white">{title}</h2>
          <button className="text-gray-400 text-xs ">View All</button>
        </div>
        {/* CARDS MOBILE */}
        <div className="md:hidden grid grid-cols-1 gap-4 w-full justify-center items-center md:grid-cols-5 duration-700 ease-in-out">
          {Children.toArray(children)[index]}
        </div>
        {/* CARDS LG DEVICES */}
        <div className="hidden md:grid grid-cols-1 gap-4 w-full justify-center items-center md:grid-cols-5 duration-700 ease-in-out">
          {Children.toArray(children).slice(startIndex, endIndex)}
        </div>
      </div>

      <NextIcon
        className="text-white w-6 h-6 hover:scale-125"
        onClick={handleNext}
      />
    </section>
  );
}
