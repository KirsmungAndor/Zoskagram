// app/private/layout.tsx

import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 450, boxShadow: 3, padding: 3, borderRadius: '25px' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          {children}
        </CardContent>
      </Card>
    </Box>
  )
}
