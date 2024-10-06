"use client"
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/sharedComponent/Navbar/Navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Server-side metadata
// export const metadata = {
//   title: "TrippyWay Checkout",
//   description: "Advanced TrippyWay Checkout System",
// };

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <div className="max-w-screen-xl mx-auto">
            <Navbar />
            {children}
            {/* <Footer /> Uncomment when needed */}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
