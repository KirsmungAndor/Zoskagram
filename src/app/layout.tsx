import type { Metadata } from "next";
import "./globals.css";
import NavBar from '../components/NavBar';

export const metadata: Metadata = {
  title: "Zoškagram",
  description: "Created by Dominik Drahuta, IV.D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        {children}
        <NavBar />
      </body>
    </html>
  );
}
