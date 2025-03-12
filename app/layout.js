import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Navbar from '@/components/organisms/navbar'
import Footer from '@/components/organisms/footer'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "Lingo Foundry",
  description: "Online language learning platform",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
