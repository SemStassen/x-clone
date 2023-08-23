import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X-clone",
  description: "cloning X",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950`}>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="container mx-auto flex min-h-screen">
          <header>
            <div className="w-[300px] text-white">NavBar</div>
          </header>
          <main className="flex w-full">
            <div className="flex-grow">{children}</div>
            <div className="w-[300px] text-white">Trending Tab</div>
          </main>
        </div>
      </body>
    </html>
  );
}
