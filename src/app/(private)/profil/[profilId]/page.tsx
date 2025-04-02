// my-app/src/app/profil/[id]/page.tsx

import ProfileContent from '@/components/ProfileContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profil',
};

export default function ProfilePage({
  params,
}: {
  params: { profilId: string };
}) {
  return (
    <main>
      <ProfileContent userId={params.profilId} />
    </main>
  );
}