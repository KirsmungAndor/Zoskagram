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

  // Function to handle navigation change
  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);

    // Define paths corresponding to each BottomNavigationAction
    const paths = [
      "/",// Home
      "/profil/[id]",      // Profile
      "/prispevok",         // Feed
      "/auth/prihlasenie",       // Sign In
      "/auth/registracia"        // Sign Up
    ];

    // Navigate to the new path based on the selected index
    router.push(paths[newValue]);
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange} // Updated to use the new handler
      >
        <BottomNavigationAction label="Domov" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profil" icon={<PersonIcon />} />
        <BottomNavigationAction label="Príspevky" icon={<FeedIcon />} />
        <BottomNavigationAction label="Prihlásenie" icon={<LoginIcon />} />
        <BottomNavigationAction label="Registrácia" icon={<AppRegistrationIcon />} />
      </BottomNavigation>
    </Box>
  );
}
