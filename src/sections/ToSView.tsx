// src\sections\ToSView.tsx

"use client";

import { Container, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ToSView() {
  const router = useRouter();

  return (
    <Container sx={{ mt: 3, mb: 10 }}>
        <Typography variant="h4" gutterBottom sx={{  textAlign: 'center' }}>Podmienky používania</Typography>
       <Stack spacing={2}>
        <Typography variant="body1"><strong>1. Úvod</strong><br/>Tieto podmienky služby (ďalej len "Podmienky") upravujú vaše používanie sociálnej siete Zoškagram, ktorú prevádzkuje Stredná priemyselná škola elektrotechnická na Zochovej ulici v Bratislave (ďalej len "Prevádzkovateľ"). Používaním našej služby súhlasíte s týmito Podmienkami.</Typography>
        <Typography variant="body1"><strong>2. Registrácia a účet</strong><br/></Typography>
        <ol>
          <li>Pri registrácii je potrebné poskytnúť pravdivé a aktuálne informácie.</li>
          <li>Používatelia sú zodpovední za bezpečnosť svojho účtu a prihlasovacích údajov.</li>
        </ol>
        <Typography variant="body1"><strong>3. Používanie a služby</strong></Typography>
        <ol>
          <li>Používatelia môžu zdieľať fotografie a videá, ktoré sú v súlade s týmito Podmienkami a s pravidlami školy.</li>
          <li>Je zakázané zdieľať obsah, ktorý je nezákonný, urážlivý, alebo porušuje práva iných osôb.</li>
          <li>Používatelia nesmú používať službu na šírenie spamu alebo na iné rušivé aktivity.</li>
        </ol>
        <Typography variant="body1"><strong>4. Práva a povinnosti používateľov</strong></Typography>
        <ol>
          <li>Používatelia majú právo na ochranu svojich osobných údajov v súlade s GDPR.</li>
          <li>Používatelia sú povinní dodržiavať všetky platné zákony a pravidlá školy pri používaní služby.</li>
          <li>Prevádzkovateľ má právo odstrániť akýkoľvek obsah, ktorý porušuje tieto Podmienky alebo je inak nevhodný.</li>
        </ol>
        <Typography variant="body1"><strong>5. Ochrana osobných údajov</strong></Typography>
        <ol>
          <li>Prevádzkovateľ spracúva osobné údaje používateľov v súlade s GDPR a zákonom č. 18/2018 Z.z. o ochrane osobných údajov.</li>
          <li>Viac informácií o spracúvaní osobných údajov nájdete v našich Zásadách ochrany osobných údajov.</li>
        </ol>
        <Typography variant="body1"><strong>6. Zodpovednosť</strong></Typography>
        <ol>
          <li>Prevádzkovateľ nezodpovedá za obsah, ktorý zdieľajú používatelia.</li>
          <li>Používatelia sú výlučne zodpovední za obsah, ktorý zdieľajú a za akékoľvek dôsledky svojich aktivít na platforme.</li>
        </ol>
        <Typography variant="body1"><strong>7. Zmeny podmienok</strong></Typography>
        <ol>
          <li>Prevádzkovateľ si vyhradzuje právo kedykoľvek zmeniť tieto Podmienky.</li>
          <li>O zmenách Podmienok budú používatelia informovaní prostredníctvom služby alebo emailom.</li>
        </ol>
        <Typography variant="body1"><strong>8. Kontaktné informácie</strong><br/>Ak máte akékoľvek otázky týkajúce sa týchto Podmienok, prosím, kontaktujte nás na office@zochova.sk. Používaním našej služby potvrdzujete, že ste si tieto Podmienky prečítali, rozumiete im a súhlasíte s nimi.</Typography>
       </Stack>
       <Button variant="contained" color="primary" onClick={() => {router.push('/auth/registracia')}}>Späť</Button>
    </Container>
  );
}