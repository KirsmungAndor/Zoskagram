// my-app/src/app/prispevok/page.tsx

import PostListView from '../../../sections/PostListView'

export const metadata = { title: `Zoznam príspevkov | Zoškagram`, description: `Vytvorila Stredná priemyselná škola elektrotechnická`}

export default function PostList() {
  return <PostListView />
}