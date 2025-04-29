import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Narnia Game",
  description: "Guess the character from the Chronicles of Narnia! Try to guess the \
  daily character and play the infinite mode.",
  openGraph: {
    title: "Narnia Game",
    description: "Guess the character from the Chronicles of Narnia! Try to guess the \
    daily character and play the infinite mode.",
    url: 'https://narniagame.github.io/fiveTries/',
    siteName: 'Narnia Game',
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
