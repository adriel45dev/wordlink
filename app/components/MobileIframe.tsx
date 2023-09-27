"use client";
import React from "react";

interface MobileIframeProps {
  url: string;
}

const MobileIframe = ({ url }: MobileIframeProps) => {
  // Set the user agent of the iframe to mobile

  // Render the iframe
  return (
    <div className="m-2 flex w-full px-8">
      <iframe
        src={url}
        seamless
        title="Mobile Iframe"
        className="flex h-96 w-full rounded-2xl "
      />
    </div>
  );
};

export default MobileIframe;
