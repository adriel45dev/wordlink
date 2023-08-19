import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wordlink App",
  description: "Learn languages",
  // icons: { icon: { url: "/images/logo.svg", type: "image/svg" } },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        {/* Header */}
        {/* <Header /> */}
        {children}
        {/* Footer */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
