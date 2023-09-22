import PlayIcon from "@/public/icons/PlayIcon";
import PauseIcon from "@/public/icons/PauseIcon"; // Importe o ícone de pausa
import React, { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Audio {
  play(): void;
  pause(): void;
}

const SpeechComponent = ({ text }: { text: string }) => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const handlePlay = async () => {
    audio.pause();

    const response = await fetch(
      `https://api.voicerss.org/?key=${API_KEY}&hl=en-us&src=${encodeURIComponent(
        text,
      )}`,
    );
    const arrayBuffer = await response.arrayBuffer();
    const audioBlob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(audioBlob);

    audio.src = url;
    audio.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <button
      onClick={isPlaying ? handlePause : handlePlay}
      className="flex flex-col items-center justify-center"
    >
      {isPlaying ? (
        <PauseIcon className="h-10 w-10 text-green-500" />
      ) : (
        <PlayIcon className="h-10 w-10 text-white" />
      )}
    </button>
  );
};

export default SpeechComponent;
