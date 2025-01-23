// my-app/src/app/profil/[id]/page.tsx

import ProfileView from '../../../../sections/ProfileView'

export const metadata = { title: `Detail profilu | Zoškagram`, description: `Vytvorila Stredná priemyselná škola elektrotechnická`}

export default function ProfileDetail() {
  return <ProfileView />
}