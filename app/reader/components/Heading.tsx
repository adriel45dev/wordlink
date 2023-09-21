import React from "react";

type CardHeadingProps = {
  slug: string;
};

export default function Heading({ slug }: CardHeadingProps) {
  return (
    <div>
      <h1 className="my-3 text-center text-4xl font-extrabold text-white">
        {slug.replace("_", " ")}
      </h1>
      <h2 className="text-center text-2xl font-normal text-white">
        Unlocking the World through Language
      </h2>
    </div>
  );
}
