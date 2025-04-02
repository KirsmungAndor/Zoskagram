'use client';

import React, { useState, useEffect, Children, isValidElement, cloneElement } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../styles/theme';
import SimpleBottomNavigation, { type NavBarProps } from '@/components/NavBar';

interface ClientThemeProviderProps {
  children: React.ReactNode;
  defaultTheme: Theme;
}

export default function ClientThemeProvider({ children, defaultTheme }: ClientThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme.palette.mode === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme.palette.mode);
  };

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
  }

  return (
    <ThemeProvider theme={theme}>
      {Children.map(children, child => {
        if (isValidElement<NavBarProps>(child) && child.type === SimpleBottomNavigation) {
          return cloneElement<NavBarProps>(child, {
            currentTheme: theme.palette.mode,
            onThemeChange: toggleTheme
          });
        }
        return child;
      })}
    </ThemeProvider>
  );
} 