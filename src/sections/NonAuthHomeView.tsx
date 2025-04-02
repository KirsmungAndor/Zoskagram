// src/sections/NonAuthHomeView.tsx

"use client";

import { Box, Typography, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

export default function NonAuthHomeView() {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        px: 3,
      }}
    >
      {/* Logo or Icon (Optional) */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(to bottom, #a800d9, #82289c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        Vítajte na Zoškagrame!
      </Typography>

      <Typography variant="h6" color='text.primary' sx={{ opacity: 0.9, mb: 3 }}>
        Skontaktuje sa s priateľmi. Zdieľajte momenty. Pripojte sa dnes.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<LoginIcon />}
        onClick={() => {router.push('/auth/prihlasenie')}}
        sx={{
          borderRadius: '50px', // Soft pill shape
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#9100b5',
          },
        }}
      >
        Prihlásiť
      </Button>
    </Box>
  );
}
