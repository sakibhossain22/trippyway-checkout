import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/sharedComponent/Navbar/Navbar";
import Footer from "@/sharedComponent/Navbar/Footer";

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

export const metadata = {
  title: "TrippyWay Checkout",
  description: "Advance Trippyway Checkout System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-screen-xl mx-auto">
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
