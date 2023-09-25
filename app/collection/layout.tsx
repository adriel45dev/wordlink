import React from "react";
import SubHeader from "../components/SubHeader";
import { NavbarContextProvider } from "../context/NavbarContext";
import Header from "./components/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <NavbarContextProvider>
      <Header />
      <main className="flex min-h-screen flex-col  items-center bg-slate-900">
        {children}
      </main>
    </NavbarContextProvider>
  );
}
