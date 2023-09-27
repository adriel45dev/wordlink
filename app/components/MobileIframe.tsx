"use client";
import React from "react";

interface MobileIframeProps {
  url: string;
}

const MobileIframe = ({ url }: MobileIframeProps) => {
  // Set the user agent of the iframe to mobile

  // Render the iframe
  return (
    <div className="no-scrollbar w-full scale-75 px-8">
      <iframe
        src={url}
        seamless
        title="Mobile Iframe"
        className="no-scrollbar inline-block h-96 min-w-full rounded-2xl "
      />
    </div>
  );
};

export default MobileIframe;
