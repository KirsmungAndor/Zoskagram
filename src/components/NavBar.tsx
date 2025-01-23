// src/sections/NavBar.tsx

"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession } from 'next-auth/react';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';

interface NavBarProps {
  currentTheme: string;
  onThemeChange: () => void;
}

export default function SimpleBottomNavigation({ currentTheme, onThemeChange }: NavBarProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [value, setValue] = React.useState(0);

  const handleNavigationChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const authenticatedActions = [
    <BottomNavigationAction key="home" label="Domov" icon={<HomeIcon />} onClick={() => { setValue(0); router.push('/'); }} />,
    <BottomNavigationAction key="profile" label="Profil" icon={session?.user?.image ? (<Avatar alt={session?.user?.name || "User"} src={session?.user?.image || undefined} sx={{ width: 24, height: 24 }}/>) : (<Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>)} onClick={() => { setValue(1); router.push('/profil'); }} />,
    <BottomNavigationAction key="posts" label="Príspevky" icon={<FeedIcon />} onClick={() => { setValue(2); router.push('/prispevok'); }} />,
    <BottomNavigationAction key="logout" label="Odhlásenie" icon={<LogoutIcon />} onClick={() => { setValue(3); router.push('/auth/odhlasenie'); }} />
  ];

  const nonAuthenticatedActions = [
    <BottomNavigationAction key="home" label="Domov" icon={<HomeIcon />} onClick={() => { setValue(0); router.push('/'); }} />,
    <BottomNavigationAction key="aboutme" label="O mne" icon={<InfoIcon />} onClick={() => { setValue(1); router.push('/o-mne'); }} />,
    <BottomNavigationAction key="login" label="Prihlásenie" icon={<LoginIcon />} onClick={() => { setValue(2); router.push('/auth/prihlasenie'); }} />,
    <BottomNavigationAction key="register" label="Registrácia" icon={<AppRegistrationIcon />} onClick={() => { setValue(3); router.push('/auth/registracia'); }} />,
  ];

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
        sx={{
          boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.05)',
          zIndex: 1000,
        }}
      >
        {session ? authenticatedActions : nonAuthenticatedActions}
      <BottomNavigationAction key="changeTheme" label="Zmeniť vzhľad" icon={currentTheme === 'dark' ? <Brightness7 /> : <Brightness4 />} onClick={onThemeChange} sx={{
            '&.Mui-selected': {
              color: 'inherit',
              transform: 'none',
            },
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&:active': {
              backgroundColor: 'transparent',
            },
          }}/>
    </BottomNavigation>
    </Box>
  );
}
