"use client";
import React, { useState } from "react";

export default function Add() {
  const [color, setColor] = useState("#0390fc");
  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  return (
    <>
      <h1 className="my-6 text-4xl font-bold text-white">Add</h1>
      <div className="relative flex w-full items-center justify-center">
        <div
          className="absolute m-auto h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <input
          type="color"
          value={color}
          className="h-4 w-24 rounded-2xl px-24 py-4 text-xs outline-none"
          onChange={handleColor}
          style={{ backgroundColor: color, borderColor: color }}
        />
      </div>
    </>
  );
}
