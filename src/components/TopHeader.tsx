"use client";

import { Typography, Box } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 20,
        left: 25,
        zIndex: 1000,
      }}
    >
      <Link href="/" passHref style={{ textDecoration: 'none' }}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: 'bold', cursor: 'pointer', background: 'linear-gradient(to bottom, #a800d9, #82289c)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',}}
        >
          Zoškagram
        </Typography>
      </Link>
    </Box>
  );
}
