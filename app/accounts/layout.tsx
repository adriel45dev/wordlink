import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
