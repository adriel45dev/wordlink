"use client";
import PlayIcon from "@/public/icons/PlayIcon";
import PauseIcon from "@/public/icons/PauseIcon";
import React, { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Audio {
  play(): void;
  pause(): void;
}

const Player = ({ text }: { text: string }) => {
  const [audio, setAudio] = useState<Audio>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  useEffect(() => {
    if (!audio) return;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const handlePlay = async () => {
    if (!audio) return;
    audio.pause();

    const response = await fetch(
      `https://api.voicerss.org/?key=${API_KEY}&hl=en-us&src=${encodeURIComponent(
        text,
      )}`,
    );
    const arrayBuffer = await response.arrayBuffer();
    const audioBlob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(audioBlob);

    (audio as HTMLAudioElement).src = url;
    audio.play();
    setIsPlaying(true);

    // Verifica se o áudio terminou
  };

  const handlePause = () => {
    if (!audio) return;
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

export default Player;
