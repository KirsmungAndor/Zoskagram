// app/components/NavBar.js

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

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange} // Updated to use the new handler
      >
        <BottomNavigationAction label="Domov" icon={<HomeIcon />} onClick={() => { setValue(0); router.push('/'); }} />
        <BottomNavigationAction label="Profil" icon={<PersonIcon />} onClick={() => { setValue(0); router.push('/profil'); }} />
        <BottomNavigationAction label="Príspevky" icon={<FeedIcon />} onClick={() => { setValue(0); router.push('/prispevok'); }} />
        <BottomNavigationAction label="Prihlásenie" icon={<LoginIcon />} onClick={() => { setValue(0); router.push('/auth/prihlasenie'); }} />
        <BottomNavigationAction label="Registrácia" icon={<AppRegistrationIcon onClick={() => { setValue(0); router.push('/auth/registracia'); }} />} />
      </BottomNavigation>
    </Box>
  );
}
