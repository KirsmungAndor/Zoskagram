// my-app/src/app/prispevok/[id]/page.tsx

import Typography from '@mui/material/Typography';

export const metadata = { title: `Detail príspevku | Zoškagram`}

export default function PostDetail({ params }: {
  params: { prispevokId: string };
}) {
  return (
    <Typography>Detail príspevku { params.prispevokId }</Typography>
  );
}