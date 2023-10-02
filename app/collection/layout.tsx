import React from "react";
import { NavbarContextProvider } from "../context/NavbarContext";
import Header from "./components/Header";
import { LanguageContextProvider } from "../context/LanguageContext";
import { LanguageMenuContextProvider } from "../context/LanguageMenuContext";
import { ProfileMenuContextProvider } from "../context/ProfileMenuContext";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContextProvider>
      <NavbarContextProvider>
        <LanguageMenuContextProvider>
          <ProfileMenuContextProvider>
            <Header />
            <main className="flex min-h-screen flex-1 flex-col items-center bg-slate-900">
              {children}
            </main>
          </ProfileMenuContextProvider>
        </LanguageMenuContextProvider>
      </NavbarContextProvider>
    </LanguageContextProvider>
  );
}
