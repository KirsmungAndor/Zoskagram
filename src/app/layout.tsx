// src/app/layout.tsx
"use client";

import "./globals.css";
import SimpleBottomNavigation from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";
import { CssBaseline } from '@mui/material';
import TopHeader from '@/components/TopHeader';
import { ThemeProvider } from '@/contexts/ThemeContext';

//export const metadata: Metadata = {
//  title: "SnapZoška",
//  description: "Created by students of SPŠE Zochova 9, Bratislava",
//};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body style={{ margin: 0 }}>
        <AuthProvider>
          <ThemeProvider>
            <CssBaseline />
            <TopHeader />
            {children}
            <SimpleBottomNavigation />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


