'use server';

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export async function toggleLike(postId: string) {
  const session = await getServerSession(authOptions);
  console.log('Server-side session:', JSON.stringify(session, null, 2));
  
  if (!session?.user?.id) {
    console.log('No user ID in session');
    return { success: false, error: 'Please sign in to like posts' };
  }

  console.log('User ID from session:', session.user.id);
  console.log('Post ID:', postId);

  try {
    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: postId,
        },
      },
    });

    console.log('Existing like:', existingLike);

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: postId,
          },
        },
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId: postId,
        },
      });
    }

    // Get updated likes count
    const likesCount = await prisma.like.count({
      where: { postId }
    });

    return { 
      success: true, 
      liked: !existingLike,
      likesCount 
    };
  } catch (error) {
    console.error('Error in toggleLike:', error);
    return { success: false, error: 'Failed to toggle like' };
  }
}

export async function getLikesCount(postId: string) {
  try {
    return await prisma.like.count({
      where: { postId }
    });
  } catch (error) {
    console.error('Error getting likes count:', error);
    return 0;
  }
}

export async function isPostLiked(postId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return false;
  }

  try {
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: postId,
        },
      },
    });
    return !!like;
  } catch (error) {
    console.error('Error checking if post is liked:', error);
    return false;
  }
} 