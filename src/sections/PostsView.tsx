"use client";

import { useEffect, useState, useOptimistic, startTransition } from "react";
import { fetchPosts } from "@/app/actions/posts";
import { toggleLike, getLikesCount, isPostLiked, LikeActionResponse } from "@/app/actions/likes";
import Image from 'next/image';

// MUI imports
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

// Post interface
interface Post {
  id: string;
  userId: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
  images: {
    id: string;
    imageUrl: string;
    order: number;
  }[];
}

interface OptimisticPost extends Post {
  optimisticLiked?: boolean;
  optimisticLikesCount?: number;
}

const PostsView = () => {
  const [posts, setPosts] = useState<OptimisticPost[]>([]);
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(posts);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts: Post[] = await fetchPosts();
        setPosts(fetchedPosts);
        
        // Load like status and counts for each post
        for (const post of fetchedPosts) {
          const isLiked = await isPostLiked(post.id);
          const count = await getLikesCount(post.id);
          setPosts(prev => prev.map(p => 
            p.id === post.id 
              ? { ...p, optimisticLiked: isLiked, optimisticLikesCount: count }
              : p
          ));
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handleLikeClick = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Optimistically update the UI within a transition
    startTransition(() => {
      const optimisticPost = {
        ...post,
        optimisticLiked: !post.optimisticLiked,
        optimisticLikesCount: (post.optimisticLikesCount || 0) + (post.optimisticLiked ? -1 : 1)
      };
      setOptimisticPosts(prev => prev.map(p => 
        p.id === postId ? optimisticPost : p
      ));
    });

    try {
      const result = await toggleLike(postId);
      
      if (result.success) {
        // Update with real data within a transition
        startTransition(() => {
          setPosts(prev => prev.map(p => 
            p.id === postId 
              ? { 
                  ...p, 
                  optimisticLiked: result.liked,
                  optimisticLikesCount: result.likesCount
                }
              : p
          ));
        });
      } else {
        // Revert optimistic update on error within a transition
        startTransition(() => {
          setPosts(prev => prev.map(p => 
            p.id === postId 
              ? { 
                  ...p, 
                  optimisticLiked: post.optimisticLiked,
                  optimisticLikesCount: post.optimisticLikesCount
                }
              : p
          ));
        });
        console.error('Failed to toggle like:', result.error);
      }
    } catch (error) {
      // Revert optimistic update on error within a transition
      startTransition(() => {
        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { 
                ...p, 
                optimisticLiked: post.optimisticLiked,
                optimisticLikesCount: post.optimisticLikesCount
              }
            : p
        ));
      });
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {/* Posts List */}
      <Grid container spacing={3} justifyContent="center">
        {optimisticPosts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card 
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {/* User Header */}
              <Box 
                display="flex" 
                alignItems="center" 
                p={2} 
                sx={{ 
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: 'primary.main',
                    mr: 1
                  }}
                >
                  {post.user.name ? post.user.name.charAt(0) : "?"}
                </Avatar>
                <Box flexGrow={1}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {post.user.name || "Neznámy používateľ"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.createdAt).toLocaleDateString('sk-SK')}
                  </Typography>
                </Box>
              </Box>

              {/* Post Image */}
              <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%', bgcolor: 'grey.100' }}>
                {post.images && post.images.length > 0 ? (
                  <Image
                    src={post.images[0].imageUrl}
                    alt={post.caption || "Post image"}
                    fill
                    sizes="(max-width: 600px) 100vw, 600px"
                    style={{ objectFit: 'contain' }}
                    priority
                    onError={(e) => {
                      console.error('Image failed to load:', post.images[0].imageUrl);
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.jpg';
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No image
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Post Actions */}
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <IconButton 
                    onClick={() => handleLikeClick(post.id)}
                    color={post.optimisticLiked ? 'error' : 'default'}
                  >
                    {post.optimisticLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {post.optimisticLikesCount || 0} {post.optimisticLikesCount === 1 ? 'like' : 'likes'}
                  </Typography>
                  <IconButton>
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Box>
                {post.caption && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {post.caption}
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsView;
