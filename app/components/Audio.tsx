"use client";
import PlayIcon from "@/public/icons/PlayIcon";
import React, { useState, useEffect } from "react";

interface Audio {
  play(): void;
  pause(): void;
}

const SpeechComponent = ({ text }: { text: string }) => {
  const [audio] = useState(new Audio());

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const handlePlay = async () => {
    audio.pause();

    const response = await fetch(
      `https://api.voicerss.org/?key=${"0a850a16d8b34bd2bda72a9a298c7418"}&hl=en-us&src=${encodeURIComponent(
        text,
      )}`,
    );
    const arrayBuffer = await response.arrayBuffer();
    const audioBlob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(audioBlob);

    audio.src = url;
    audio.play();
  };

  return (
    <button
      onClick={handlePlay}
      className="flex flex-col items-center justify-center"
    >
      <PlayIcon className="h-8 w-8 text-white" />
      <span className="rounded-2xl bg-green-500 px-2 text-xs text-white">
        v2
      </span>
    </button>
  );
};

export default SpeechComponent;
