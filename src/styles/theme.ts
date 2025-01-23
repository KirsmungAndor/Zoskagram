import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#a800d9',
        },
        secondary: {
            main: '#82289c',
        },
        text: {
            primary: '#000000',
            secondary: '#3a3a3a',
        },
        background: {
            default: '#ececec',
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
      },
    components: {
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                }
            }
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#c390f9',
        },
        secondary: {
            main: '#a390f9',
        },
        text: {
            primary: '#ffffff',
            secondary: '#dedede',
        },
        background: {
            default: '#151515',
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
      },
    components: {
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                }
            }
        },
    },
});