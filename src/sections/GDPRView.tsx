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
          <strong>Law:</strong> The Act No. 18/2018 Coll. on Protection of Personal Data and on Amendments to certain Acts (only available in Slovak here) (the Act) and the General Data Protection Regulation (Regulation (EU) 2016/679) (GDPR)
        </Typography>
        <Typography variant="body1">
          <strong>Regulator:</strong> Office for Personal Data Protection of the Slovak Republic (ÚOOÚ)
        </Typography>
        <Typography variant="body1">
          <strong>Summary:</strong> Slovakia implemented the GDPR in 2018 through the Act No. 18/2018 Coll. on Protection of Personal Data and on Amendments to certain Acts (the Act) which came into effect on May 25, 2018. The Act primarily replicates the provisions of the GDPR, introduces national derogations in certain areas, and transposes the Data Protection Directive with Respect to Law Enforcement (Directive (EU) 2016/680) into the Slovak legal system.
        </Typography>
        <Typography variant="body1">
          The Office for Personal Data Protection of the Slovak Republic (ÚOOÚ) is the national supervisory authority in the area of data protection and has further powers and responsibilities beyond those specifically conferred by Article 58 of the GDPR, such as providing consultancy services in relation to personal data protection and expressing its view on proposed legislation concerning personal data protection. In addition, the ÚOOÚ has guidance on various data protection issues, notably including its list of processing operations which are subject to Data Protection Impact Assessment pursuant to Article 35 of the GDPR.
        </Typography>
      </Stack>
      <Button variant="contained" color="primary" onClick={() => {router.push('/auth/registracia')}}>Späť</Button>
    </Container>
  );
}