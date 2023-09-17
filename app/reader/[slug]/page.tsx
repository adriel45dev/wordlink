import React from "react";

export default function Reader({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
