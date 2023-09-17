import React from "react";

export default function Reader({ params }: { params: { slug: string } }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h1 className="font-extrabold text-4xl text-white">
        {params.slug.replace("_", " ")}
      </h1>
    </div>
  );
}
