// my-app/src/app/profil/page.tsx

import ProfileContent from '../../../components/ProfileContent';

export const metadata = { 
  title: `Môj profil | Zoškagram`, 
  description: `Vytvorila Stredná priemyselná škola elektrotechnická`
};

export default function ProfilePage() {
  return <ProfileContent />;
}