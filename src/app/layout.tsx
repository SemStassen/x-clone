import { NavBar } from "@/components/Ui";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getPageSession } from "@/server/lucia";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X-clone",
  description: "cloning X",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPageSession();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950`}>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="container mx-auto flex min-h-screen">
          <header>
            <NavBar session={session}></NavBar>
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
