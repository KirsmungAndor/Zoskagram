// my-app/src/app/profil/page.tsx

import ProfileListView from '../../../sections/ProfileListView'

export const metadata = { title: `Zoznam profilov | Zoškagram`, description: `Vytvorila Stredná priemyselná škola elektrotechnická`}

export default function ProfileList() {
  return <ProfileListView />
}