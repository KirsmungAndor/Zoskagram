'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toggleLike, getLikesCount, isPostLiked } from '@/app/actions/likes';

interface PostCardProps {
  post: {
    id: string;
    imageUrl: string;
    caption: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const checkLikeStatus = async () => {
      const isLiked = await isPostLiked(post.id);
      const count = await getLikesCount(post.id);
      setLiked(isLiked);
      setLikesCount(count);
    };
    checkLikeStatus();
  }, [post.id]);

  const handleLikeClick = async () => {
    try {
      const result = await toggleLike(post.id);
      setLiked(result.liked);
      const newCount = await getLikesCount(post.id);
      setLikesCount(newCount);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        title={post.caption || 'No caption'}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.imageUrl}
        alt={post.caption || 'Post image'}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleLikeClick} color={liked ? 'error' : 'default'}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 