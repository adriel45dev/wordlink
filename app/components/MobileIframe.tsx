"use client";
import React from "react";

interface MobileIframeProps {
  url: string;
}

const MobileIframe = ({ url }: MobileIframeProps) => {
  // Set the user agent of the iframe to mobile

  // Render the iframe
  return (
    <iframe
      src={url}
      seamless
      title="Mobile Iframe"
      className="flex h-96 w-full rounded-2xl "
    />
  );
};

export default MobileIframe;
