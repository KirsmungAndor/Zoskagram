// src\sections\AboutMeView.tsx

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function About() {
  return (
    <Container sx={{ mt: 3 }}>
        <Typography sx={{ textAlign: 'center' }}>Stránka o mne</Typography>
        <Typography>Tuto bude onedlho stránka o mne.</Typography>
    </Container>
  );
}