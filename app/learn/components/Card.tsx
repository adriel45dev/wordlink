import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card({ id }: { id: number }) {
  return (
    <Link
      href={`/reader/Card_${id}`}
      className="flex flex-col items-center h-72 rounded-2xl text-white bg-neutral-950 hover:scale-105 hover:bg-neutral-900 group"
    >
      {/* Card Image */}
      <div className="w-full h-32">
        <div className="relative h-full">
          <Image
            src="/images/card/cover-3.jpg"
            alt="cover"
            className="object-cover rounded-t-2xl"
            fill={true}
          />
        </div>
      </div>

      <div className="border-blue-500 border-b-4 w-full group-hover:border-green-400" />

      {/* Card Info */}
      <div className="flex-1 flex flex-col p-4 justify-between ">
        <div>
          <h1 className="font-bold text-2xl">Card Title {id}</h1>
          <p className="text-sm">Description... [20]</p>
        </div>

        <div className="flex flex-col text-xs text-gray-300">
          <div className="flex gap-2 items-center">
            <div className="w-5 h-2 bg-violet-600 rounded-2xl"></div>
            <span>{35} New Words</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-5 h-2 bg-blue-600 rounded-2xl"></div>
            <span>{5} Links</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-5 h-2 bg-green-600 rounded-2xl"></div>
            <span>{1} Known</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
