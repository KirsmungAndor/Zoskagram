// src\sections\SignUpView.tsx

"use client";

import { signIn } from "next-auth/react";
import { Button, Checkbox, FormControlLabel, Typography, Alert, Snackbar } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import React, { useState } from 'react';


export default function SignUpView() {
  const [isChecked, setIsChecked] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleButtonClick = () => {
    if (!isChecked) {
      setOpenWarning(true);
    }
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 1 }}>Registrácia</Typography>
      <Typography sx={{ mb: 3 }}>Máte účet? <Link href="/auth/prihlasenie">Prihláste sa.</Link></Typography>
      <FormControlLabel control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} name="terms" color="primary"/>} label={isChecked ? <Typography>Súhlasím s <Link href="/gdpr">GDPR</Link> a <Link href="/podmienky">podmienkami služby</Link>.</Typography> : <Typography>Musíte súhlasiť s <Link href="/gdpr">GDPR</Link> a <Link href="/podmienky">podmienkami služby</Link>, aby ste pokračovali.</Typography>} sx={{ mb: 1 }}/>
      <div onClick={() => handleButtonClick()}>
        <Button variant="contained" color="primary" onClick={() => signIn("google")} disabled={!isChecked} sx={{
          borderRadius: '50px', // Soft pill shape
          px: 4,
          py: 1.5,
          mb: 1,
          fontSize: '1.1rem',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#9100b5',
          },
        }}>
        <GoogleIcon sx={{ mr: 1 }}/>Registrovať s Google
        </Button>
        <Button variant="contained" color="primary" disabled={!isChecked} sx={{
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
          <GitHubIcon sx={{ mr: 1 }}/>Registrovať s GitHub
        </Button>
      </div>
      <Snackbar open={openWarning} onClose={handleCloseWarning}>
        <Alert onClose={handleCloseWarning} severity="warning" sx={{ width: '100%' }}>
          Musíte súhlasiť s <Link href="/gdpr">GDPR</Link> a <Link href="/podmienky">podmienkami služby</Link>, aby ste sa mohli zaregistrovať.
        </Alert>
      </Snackbar>
    </div>
  );
}
