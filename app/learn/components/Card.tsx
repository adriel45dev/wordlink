import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  data: DataType;
};

type DataType = {
  title: string;
  text: string;
  author: string;
  tag: string;
  id: string;
  image: string;
};

export default function Card({ data }: CardProps) {
  const { title, text, author, tag, id, image } = data;
  return (
    <Link
      href={`/reader/${id}`}
      className="group flex h-72 flex-col items-center rounded-2xl bg-neutral-950 text-white hover:scale-105 hover:bg-neutral-900"
    >
      {/* Card Image */}
      <div className="h-32 w-full">
        <div className="relative h-full">
          <Image
            src={`${image}` || "/images/card/cover-3.jpg"}
            alt="cover"
            className="rounded-t-2xl object-cover"
            fill={true}
          />
        </div>
      </div>

      <div className="w-full border-b-4 border-blue-500 group-hover:border-green-400" />

      {/* Card Info */}
      <div className="flex flex-1 flex-col justify-between p-4 ">
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="my-2 flex w-fit justify-center rounded-2xl bg-slate-600 px-2 py-1 text-sm">
            {tag}
          </p>
        </div>

        <div className="flex flex-col text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <div className="h-2 w-5 rounded-2xl bg-violet-600"></div>
            <span>{35} New Words</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-5 rounded-2xl bg-blue-600"></div>
            <span>{5} Links</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-5 rounded-2xl bg-green-600"></div>
            <span>{1} Known</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
