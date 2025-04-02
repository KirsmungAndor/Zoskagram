"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { fetchPosts } from "@/app/actions/posts";
import LikeButton from "@/components/LikeButton";
import Link from "next/link";

interface Post {
  id: string;
  userId: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  images: {
    imageUrl: string;
  }[];
  likes: {
    id: string;
    userId: string;
  }[];
  _count?: {
    comments: number;
  };
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 8 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
        Zoznam Príspevkov
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card
              sx={{
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                borderRadius: 3,
                boxShadow: 3,
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <Link href={`/prispevok/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                {post.images[0] && (
                  <CardMedia
                    component="img"
                    image={post.images[0].imageUrl}
                    alt={post.caption || "Príspevok bez popisu"}
                    sx={{
                      width: "100%",
                      maxHeight: "500px",
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                )}
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      alt={post.user.name || "User"}
                      src={post.user.image || undefined}
                      sx={{ width: 40, height: 40, mr: 2 }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {post.user.name || "Neznámy používateľ"}
                    </Typography>
                  </Box>
                  <Typography variant="body1" gutterBottom sx={{ color: "text.secondary" }}>
                    {post.caption || "Bez popisu"}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                    <LikeButton
                      postId={post.id}
                      userId={post.user.id}
                      initialLikes={post.likes.length}
                      initialLiked={post.likes.some(like => like.userId === post.user.id)}
                    />
                    {post._count?.comments && (
                      <Typography variant="body2" color="text.secondary">
                        {post._count.comments} komentárov
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}