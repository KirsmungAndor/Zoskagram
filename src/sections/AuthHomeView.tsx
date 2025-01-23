// src/sections/AuthHomeView.tsx

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Session } from 'next-auth';

export default function AuthHomeView({ session }: { session: Session}) {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3, textAlign: 'center' }}>
        Vitajte, {session?.user?.name  || "užívateľ"}!
      </Typography>
      <Typography sx={{ textAlign: 'center' }}>Ste prihlásený.</Typography>
      </Container>
  );
}
