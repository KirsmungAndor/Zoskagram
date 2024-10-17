// src/app/auth/registracia/page.tsx
"use client"; // Add this line

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SignUp() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4">Registrácia</Typography>
      {/* Add your registration form here if you have one */}
    </Box>
  );
}
