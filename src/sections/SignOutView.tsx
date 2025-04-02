// src\sections\SignOutView.tsx

"use client";

import { signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignUp() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 1 }}>Odhlásenie</Typography>
      <Button variant="contained" color="primary" onClick={() => signOut()} sx={{
          borderRadius: '50px', // Soft pill shape
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#9100b5',
          },
        }}>
        <LogoutIcon sx={{ mr: 1 }}/>Odhlásiť
      </Button>
    </div>
  );
}
