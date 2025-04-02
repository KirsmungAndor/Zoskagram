// my-app/src/app/profil/page.tsx

import Typography from '@mui/material/Typography';

export default function ProfileListView() {
  return (
    <Typography
    variant="h4"
    sx={{
      mt: 4,
      mb: 3,
      fontWeight: 700,
      textAlign: "center",
      color: "text.primary",
    }}>Zoznam profilov</Typography>
  );
}