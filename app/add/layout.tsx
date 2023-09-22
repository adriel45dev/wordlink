import React from "react";
import SubHeader from "../components/SubHeader";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubHeader activePage={"add"} />
      <main className="flex min-h-screen flex-col  items-center bg-slate-900">
        {children}
      </main>
    </>
  );
}
