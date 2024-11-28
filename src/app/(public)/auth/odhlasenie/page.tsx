// src/app/auth/odhlasenie/page.tsx
"use client"; // Add this line

import { signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SignOut() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4">Odhlásenie</Typography>
      <Button variant="contained" color="primary" onClick={() => signOut()}>
        Sign Out
      </Button>
    </Box>
  );
}
