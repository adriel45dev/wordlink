"use client";
import PauseIcon from "@/public/icons/PauseIcon";
import PlayIcon from "@/public/icons/PlayIcon";
import { useState, useEffect } from "react";

const SpeechComponent = ({ text }: { text: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const speech = window.speechSynthesis;

    return () => {
      speech.cancel();
    };
  }, []);

  const handlePlay = () => {
    const speech = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en";

    utterance.addEventListener("end", () => {
      setIsPlaying(false);
    });

    setIsPlaying(true);

    speech.speak(utterance);
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isPlaying}
      className="flex flex-col items-center justify-center"
    >
      {isPlaying ? (
        <PauseIcon className="h-8 w-8 text-white" />
      ) : (
        <PlayIcon className="h-8 w-8 text-white" />
      )}
      <span className="rounded-2xl bg-green-500 px-2 text-xs text-white">
        v1
      </span>
    </button>
  );
};

export default SpeechComponent;
