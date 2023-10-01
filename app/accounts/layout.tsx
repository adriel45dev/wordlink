import React from "react";
import Header from "../components/MainHeader";
import Footer from "../components/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex min-h-full w-full flex-col">{children}</main>
      <Footer />
    </>
  );
}
