import type { Metadata } from "next";
import "./globals.css";
import {Kumbh_Sans} from "next/font/google";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300",  "400", "500", "600", "700"],
  variable: "--font-kumbh",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${kumbh.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
