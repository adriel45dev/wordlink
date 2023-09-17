import React, { Children } from "react";

type LibrarySectionProps = {
  children: React.ReactNode;
  title: string;
};

export default function LibrarySection({
  children,
  title,
}: LibrarySectionProps) {
  return (
    <section className="w-full h-full px-8 my-6 flex flex-col gap-4">
      <div className=" flex flex-row items-center justify-between">
        <h2 className="text-2xl text-white">{title}</h2>
        <button className="text-gray-400 text-xs sm:hidden">View All</button>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full  justify-center items-center md:grid-cols-5 overflow-hidden">
        {children}
      </div>
    </section>
  );
}
