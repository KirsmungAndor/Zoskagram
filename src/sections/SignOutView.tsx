// src\sections\SignOutView.tsx

"use client";

import { signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SignUp() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 1 }}>Odhlásenie</Typography>
      <Button variant="contained" color="primary" onClick={() => signOut()}>
        Odhlásiť
      </Button>
    </div>
  );
}
