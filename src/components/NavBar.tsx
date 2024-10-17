// src/sections/NavBar.tsx

"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession, signOut } from 'next-auth/react';

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const { data: session } = useSession();
  const [value, setValue] = React.useState(0);

  const handleNavigationChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
      >
        <BottomNavigationAction label="Domov" icon={<HomeIcon />} onClick={() => { setValue(0); router.push('/'); }} />
        <BottomNavigationAction label="Profil" icon={<PersonIcon />} onClick={() => { setValue(1); router.push('/profil'); }} />
        <BottomNavigationAction label="Príspevky" icon={<FeedIcon />} onClick={() => { setValue(2); router.push('/prispevok'); }} />
        {session ? (
          <BottomNavigationAction label="Odhlásenie" icon={<LogoutIcon />} onClick={() => { setValue(3); signOut(); }} />
        ) : (
          [
            <BottomNavigationAction key="login" label="Prihlásenie" icon={<LoginIcon />} onClick={() => { setValue(3); router.push('/auth/prihlasenie'); }} />,
            <BottomNavigationAction key="register" label="Registrácia" icon={<AppRegistrationIcon />} onClick={() => { setValue(4); router.push('/auth/registracia'); }} />
          ]
        )}
      </BottomNavigation>
    </Box>
  );
}
