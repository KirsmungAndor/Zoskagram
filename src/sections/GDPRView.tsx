// src\sections\GDPRView.tsx

"use client";

import { Container, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function GDPRView() {
  const router = useRouter();

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        GDPR Informácie
      </Typography>
      <Stack spacing={2}>
        <Typography variant="body1">
          <strong>Zákon:</strong> Zákon č. 18/2018 Z. z. o ochrane osobných údajov a o zmene a doplnení niektorých zákonov (dostupný len v slovenskom jazyku) (ďalej len „zákon“) a všeobecné nariadenie o ochrane údajov (nariadenie (EÚ) 2016/679) (ďalej len „GDPR“)
        </Typography>
        <Typography variant="body1">
          <strong>Regulátor:</strong> Úrad na ochranu osobných údajov Slovenskej republiky (ÚOOÚ)
        </Typography>
        <Typography variant="body1">
          <strong>Zhrnutie:</strong> Slovensko implementovalo GDPR v roku 2018 prostredníctvom zákona č. 18/2018 Z. z. o ochrane osobných údajov a o zmene a doplnení niektorých zákonov (zákon), ktorý nadobudol účinnosť 25. mája 2018. Zákon predovšetkým kopíruje ustanovenia GDPR, zavádza vnútroštátne výnimky v niektorých oblastiach a transponuje smernicu o ochrane údajov vo vzťahu k presadzovaniu práva (smernica (EÚ) 2016/680) do slovenského právneho poriadku.
        </Typography>
        <Typography variant="body1">
        Úrad na ochranu osobných údajov Slovenskej republiky (ÚOOÚ) je vnútroštátnym dozorným orgánom v oblasti ochrany osobných údajov a má ďalšie právomoci a povinnosti nad rámec tých, ktoré sú výslovne uvedené v článku 58 GDPR, ako napríklad poskytovanie poradenských služieb v súvislosti s ochranou osobných údajov a vyjadrovanie sa k navrhovaným právnym predpisom týkajúcim sa ochrany osobných údajov. Okrem toho má ÚOOÚ usmernenia k rôznym otázkam ochrany údajov, najmä vrátane svojho zoznamu spracovateľských operácií, ktoré podliehajú posúdeniu vplyvu na ochranu údajov podľa článku 35 GDPR.
        </Typography>
      </Stack>
      <Button variant="contained" color="primary" onClick={() => {router.push('/auth/registracia')}} sx={{ mt: 4, px: 4, borderRadius: '50px' }}>Späť</Button>
    </Container>
  );
}