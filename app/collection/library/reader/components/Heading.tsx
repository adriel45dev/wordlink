import Image from "next/image";
import React from "react";

type CardHeadingProps = {
  slug: string;
  image: string;
};

export default function Heading({ slug, image }: CardHeadingProps) {
  return (
    <div className="flex min-w-full flex-col">
      <div className="relative h-36 w-full ">
        <Image
          src={`${image}` || "/images/card/default.jpg"}
          alt="cover"
          className="object-cover"
          fill={true}
        />
      </div>

      <h1 className="my-3 text-center text-4xl font-extrabold text-white">
        {slug.replace("_", " ")}
      </h1>
    </div>
  );
}
