// src\sections\SignUpView.tsx

"use client";

import { signIn } from "next-auth/react";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import React, { useState } from 'react';

export default function SignUpView() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 1 }}>Registrácia</Typography>
      <Typography sx={{ mb: 3 }}>Máte účet? <Link href="/auth/prihlasenie">Prihláste sa.</Link></Typography>
      <FormControlLabel control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} name="terms" color="primary"/>} label={<Typography>Súhlasím s <Link href="/gdpr">GDPR</Link> a <Link href="/podmienky">podmienkami služby</Link></Typography>} sx={{ mb: 1 }}/>
      <Button variant="contained" color="primary" onClick={() => signIn("google")} disabled={!isChecked} sx={{ mb: 1 }}>
        <GoogleIcon sx={{ mr: 1 }}/>Registrovať s Google
        </Button>
      <Button variant="contained" color="primary" disabled={!isChecked}>
        <GitHubIcon sx={{ mr: 1 }}/>Registrovať s GitHub
        </Button>
    </div>
  );
}
