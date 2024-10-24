// src/sections/AuthHomeView.tsx

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Session } from 'next-auth';

export default function AuthHomeView({ session }: { session: Session}) {
  return (
    <Container>
      <Typography>Ste prihlásený.</Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Vitajte, {session?.user?.name  || "užívateľ"}!
      </Typography>
    </Container>
  );
}
