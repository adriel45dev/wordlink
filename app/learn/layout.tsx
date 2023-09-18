import React from "react";
import SubHeader from "../components/SubHeader";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubHeader />
      <main className="flex flex-col min-h-screen  items-center bg-slate-900">
        {children}
      </main>
    </>
  );
}
