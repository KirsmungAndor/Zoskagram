// src/sections/NonAuthHomeView.tsx

import Typography from '@mui/material/Typography';

export default function NonAuthHomeView() {
  return (
    <div>
      <Typography variant="h4">Welcome to Zoškagram!</Typography>
      <Typography>Please log in to see your feed.</Typography>
      {/* Add more content for non-authenticated users here */}
    </div>
  );
}
