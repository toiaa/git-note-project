import { Inter } from "next/font/google";
import "./globals.css";

import NextAuthProvider from "./NextAuthProvider";
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
          <>{children}</>
        </NextAuthProvider>
      </body>
    </html>
  );
}
