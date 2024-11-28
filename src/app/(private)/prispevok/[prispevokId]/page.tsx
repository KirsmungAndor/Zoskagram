// my-app/src/app/prispevok/[id]/page.tsx

import Typography from '@mui/material/Typography';

export const metadata = { title: `Detail príspevku | Zoškagram`}

export default async function PostDetail({ params }: {
  params: Promise<{prispevokId: string}>
}) {
  const { prispevokId } = await params;
  return (
    <Typography>Detail príspevku { prispevokId }</Typography>
  );
}