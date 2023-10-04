import { UserContext, UserContextProvider } from "./context/UserContext";
import { UserLogginProvider } from "./context/UserLoggingContext";
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
      <body className="flex min-h-screen flex-col">
        <UserContextProvider>
          <UserLogginProvider>{children}</UserLogginProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
