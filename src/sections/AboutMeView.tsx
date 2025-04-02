// src\sections\AboutMeView.tsx

import { Typography,Avatar, Container, Grid } from '@mui/material';
import ProfilePic from '@/assets/images/profilepic.jpg';

export default function About() {
  return (
<Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
      }}
    >
      {/* Profile Image */}
      <Avatar
        src={ProfilePic.src} alt="Profile Picture" sx={{ width: 120, height: 120, mb: 2, boxShadow: 3 }}
      />

      {/* Heading */}
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{
          background: 'linear-gradient(90deg, #a800d9, #82289c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        O mne
      </Typography>

      {/* Short Bio */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 600, mb: 4, lineHeight: 1.6 }}
      >
        Zdravím! Volám sa Dominik Drahuta a som vášnivý full-stack webový vývojár, ktorý miluje dizajnovať a vyvíjať moderné webové aplikácie s priateľským používateľským rozhraním. Mám odborné pozadie vo vývoji softvérových aplikácií, grafickom dizajne, databázových systémoch a sieťových technológiach.
      </Typography>

      {/* Skills & Info Grid */}
      <Grid container spacing={3} sx={{ textAlign: 'left', maxWidth: 600 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="text.primary" fontWeight={600}>
            🚀 Vášeň
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vyvíjanie web stránok, UX dizajn, dizajnovanie moderných stránok
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="text.primary" fontWeight={600}>
            💡 Zručnosti
          </Typography>
          <Typography variant="body2" color="text.secondary">
            React, Next.js, Angular, Bootstrap, Python, C#, R, Java
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="text.primary" fontWeight={600}>
            📍 Lokácia
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nachádzam sa v Bratislave
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="text.primary" fontWeight={600}>
            🎯 Cieľ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vývoj inovatívnych, prístupných a škálovateľných webových aplikácií
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}