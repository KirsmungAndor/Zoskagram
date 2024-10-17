// src/sections/AuthHomeView.tsx

import Typography from '@mui/material/Typography';

export default function AuthHomeView() {
  return (
    <div>
      <Typography variant="h4">Welcome back, User!</Typography>
      <Typography>This is your home feed.</Typography>
      {/* Add more content for authenticated users here */}
    </div>
  );
}
