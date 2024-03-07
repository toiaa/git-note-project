import { Inter } from "next/font/google";
import "./globals.css";
import { connectToDatabase } from "@/lib/database/mongoose";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToDatabase();

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
