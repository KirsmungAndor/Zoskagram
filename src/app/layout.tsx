// src/app/layout.tsx
"use client";

import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../styles/theme';
import { CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';

//export const metadata: Metadata = {
//  title: "SnapZoška",
//  description: "Created by students of SPŠE Zochova 9, Bratislava",
//};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    const newTheme = theme.palette.mode === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme.palette.mode); // Save theme to localStorage
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(darkTheme);
    }
  }, []);

  return (
    <html lang="sk">
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.default }}>
              <main style={{ flexGrow: 1 }}>
                {children}
              </main>
            </div>
            <Navbar currentTheme={theme.palette.mode} onThemeChange={toggleTheme}/> 
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


