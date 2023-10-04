"use client";
import PlayIcon from "@/public/icons/PlayIcon";
import PauseIcon from "@/public/icons/PauseIcon";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import voicerssLanguages from "../shared/data/voicerss.lang";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Audio {
  play(): void;
  pause(): void;
}

const Player = ({ text }: { text: string }) => {
  const [audio, setAudio] = useState<Audio>();
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  useEffect(() => {
    if (!audio) return;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const filterCodeLanguage = () => {
    if (!user) return "en-us";
    const { language_key } = user;
    const { name } = user.currentlanguage;
    const format_language_key = language_key.replace("_", "-");

    if (voicerssLanguages[format_language_key]) return format_language_key;

    Object.keys(voicerssLanguages).filter((key) => {
      if (voicerssLanguages[key].toLowerCase().includes(name.toLowerCase())) {
        return key;
      }
    });

    return "en-us";
  };

  const handlePlay = async () => {
    if (!audio || !user) return;
    const { target_code } = user.currentlanguage;

    audio.pause();

    const code_lang = filterCodeLanguage();

    const response = await fetch(
      `https://api.voicerss.org/?key=${API_KEY}&hl=${encodeURIComponent(
        code_lang,
      )}&src=${encodeURIComponent(text)}`,
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
