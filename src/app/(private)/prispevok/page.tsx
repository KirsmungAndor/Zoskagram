// my-app/src/app/prispevok/page.tsx

import PostsView from '../../../sections/PostsView'

export const metadata = { title: `Zoznam príspevkov | Zoškagram`, description: `Vytvorila Stredná priemyselná škola elektrotechnická`}

export default function PostList() {
  return <PostsView />
}