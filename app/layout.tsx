import { Inter } from "next/font/google";
import "./globals.css";

import NextAuthProvider from "./NextAuthProvider";
import RightNavBar from "@/components/shared/NavBar/RightNavBar";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative bg-dark-900 text-white`}>
        <NextAuthProvider>
          <div className="flex">
            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14">
              {children}
            </section>
            <RightNavBar />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
