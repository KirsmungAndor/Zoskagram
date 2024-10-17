// src/app/auth/prihlasenie/page.tsx
"use client"; // Add this line

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SignIn() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4">Prihlásenie</Typography>
      <Button variant="contained" color="primary" onClick={() => signIn("google")}>
        Sign in with Google
      </Button>
    </Box>
  );
}
