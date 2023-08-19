import Image from "next/image";
import React from "react";
import { CODE_FLAGS } from "../config";

export default function Flags() {
  return (
    <div className="flex flex-wrap justify-center items-center px-6">
      {Object.keys(CODE_FLAGS).map((key) => (
        <Image
          src={`/images/flags/${key}.svg`}
          alt={"Flag: " + CODE_FLAGS[key]}
          width={32}
          height={32}
          className="m-1 hover:scale-125 duration-150"
          key={key}
        />
      ))}
    </div>
  );
}
