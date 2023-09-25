import React from "react";
import { NavbarContextProvider } from "../context/NavbarContext";
import Header from "./components/Header";
import { LanguageContextProvider } from "../context/LanguageContext";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContextProvider>
      <NavbarContextProvider>
        <Header />
        <main className="flex min-h-screen flex-1 flex-col items-center bg-slate-900">
          {children}
        </main>
      </NavbarContextProvider>
    </LanguageContextProvider>
  );
}
