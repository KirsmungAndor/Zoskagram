// src/sections/NonAuthHomeView.tsx

import Typography from '@mui/material/Typography';

export default function NonAuthHomeView() {
  return (
    <div>
      <Typography variant="h4" sx={{ mt: 3, textAlign: 'center' }}>Welcome to Zoškagram!</Typography>
      <Typography sx={{ textAlign: 'center' }}>You aren&apos;t logged in. Log in to see your feed.</Typography>
    </div>
  );
}
