// src\sections\SignInView.tsx

"use client";

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from 'next/link'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SignInView() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 1 }}>Prihlásenie</Typography>
      <Typography sx={{ mb: 3 }}>Nemáte účet? <Link href="/auth/registracia">Zaregistrujte sa sa.</Link></Typography>
      <Button variant="contained" color="primary" onClick={() => signIn("google")} sx={{ mb: 1 }}>
        <GoogleIcon sx={{ mr: 1 }}/>Prihlásiť s Google
      </Button>
      <Button variant="contained" color="primary" onClick={() => signIn("google")}>
        <GitHubIcon sx={{ mr: 1 }}/>Prihlásiť s GitHub
      </Button>
    </div>
  );
}
