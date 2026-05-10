import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import { LeftSideBar } from "../components/LeftSideBar";
import { RightSideBar } from "../components/RightSideBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OneStrong",
  description: "ESO Guild · BR",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}>
      <body className="h-screen flex flex-col bg-[#0d0f18] overflow-hidden"> {/* overflow-hidden no body */}
        <Header />
        <div className="flex flex-1 w-full overflow-hidden"> {/* overflow-hidden aqui também */}
          <LeftSideBar />
          <main className="flex-1 min-w-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"> {/* overflow-y-auto só no main */}
            {children}
          </main>
          <RightSideBar />
        </div>
      </body>
    </html>
  );
}