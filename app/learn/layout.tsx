import React from "react";
import Header from "./components/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen  items-center bg-slate-900">
        {children}
      </main>
    </>
  );
}
