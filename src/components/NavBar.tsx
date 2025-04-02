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
import SearchIcon from '@mui/icons-material/Search';
import { useSession } from 'next-auth/react';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@/contexts/ThemeContext';

export interface NavBarProps {
  currentTheme?: 'light' | 'dark';
  onThemeChange?: () => void;
}

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigationChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigate = () => {
    handleMenuClose();
    router.push('/profil');
  };

  const handleLogout = () => {
    handleMenuClose();
    router.push('/auth/odhlasenie');
  };

  const authenticatedActions = [
    <BottomNavigationAction key="home" label="Domov" icon={<HomeIcon />} onClick={() => { setValue(0); router.push('/'); }} />,
    <BottomNavigationAction key="search" label="Hľadať" icon={<SearchIcon />} onClick={() => { setValue(1); router.push('/hladat'); }} />,
    <BottomNavigationAction 
      key="profile" 
      label="Profil" 
      onClick={handleProfileClick}
      icon={
        <Avatar 
          alt={session?.user?.name || "User"} 
          src={session?.user?.image || undefined} 
          sx={{ 
            width: 24, 
            height: 24,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          {session?.user?.name?.charAt(0) || "U"}
        </Avatar>
      }
    />,
    <BottomNavigationAction key="posts" label="Príspevky" icon={<FeedIcon />} onClick={() => { setValue(3); router.push('/prispevok'); }} />
  ];

  const nonAuthenticatedActions = [
    <BottomNavigationAction key="home" label="Domov" icon={<HomeIcon />} onClick={() => { setValue(0); router.push('/'); }} />,
    <BottomNavigationAction key="aboutme" label="O mne" icon={<InfoIcon />} onClick={() => { setValue(1); router.push('/o-mne'); }} />,
    <BottomNavigationAction key="login" label="Prihlásenie" icon={<LoginIcon />} onClick={() => { setValue(2); router.push('/auth/prihlasenie'); }} />,
    <BottomNavigationAction key="register" label="Registrácia" icon={<AppRegistrationIcon />} onClick={() => { setValue(3); router.push('/auth/registracia'); }} />,
  ];

  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
        sx={{
          boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.05)',
          zIndex: 1000,
          position: 'relative',
        }}
      >
        {status === 'authenticated' ? authenticatedActions : nonAuthenticatedActions}
      </BottomNavigation>
      <Box
        sx={{
          position: 'absolute',
          right: 16,
          bottom: 72,
          zIndex: 1001,
          backgroundColor: 'background.paper',
          borderRadius: '50%',
          boxShadow: 2,
          cursor: 'pointer',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            opacity: 0.8,
          },
        }}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <Brightness7 sx={{ fontSize: 24 }} /> : <Brightness4 sx={{ fontSize: 24 }} />}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          sx: {
            mt: -7,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={handleProfileNavigate}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Môj profil
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Odhlásiť sa
        </MenuItem>
      </Menu>
    </Box>
  );
}
