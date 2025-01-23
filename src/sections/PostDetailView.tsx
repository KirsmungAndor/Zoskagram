// my-app/src/sections/PostDetailView.tsx

interface NavBarProps {
    postId: string
  }

export default function PostDetailView(postId: NavBarProps) {

    return (
        {postId}
    );
}