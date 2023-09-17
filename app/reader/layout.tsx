import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex flex-col min-h-screen  items-center bg-slate-900">
        {children}
      </main>
    </>
  );
}
