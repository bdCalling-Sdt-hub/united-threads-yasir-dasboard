import type { Metadata } from "next";
import "./globals.css";
//import "sweetalert2/src/sweetalert2.scss";
import Providers from "@/lib/Providers/Providers";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | United Threads ",
    template: "%s | United Threads",
  },
  description: "Generated by create next app",
};

const uncutSans = localFont({
  src: "../assets/UncutSans-Variable.woff2",

  display: "block",
  variable: "--font-uncut-sans",
  weight: "200 800",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${uncutSans.className}  antialiased bg-[#232323]`}>
        <Providers>
          <NextTopLoader color='#334A55' />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
