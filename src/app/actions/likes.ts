'use server';

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export type LikeActionResponse = {
  success: boolean;
  liked: boolean;
  likesCount: number;
  error?: string;
};

export async function toggleLike(postId: string): Promise<LikeActionResponse> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return {
        success: false,
        liked: false,
        likesCount: 0,
        error: 'Unauthorized'
      };
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: postId,
        },
      },
    });

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
    return {
      success: false,
      liked: false,
      likesCount: 0,
      error: 'Failed to toggle like'
    };
  }
}

export async function getLikesCount(postId: string): Promise<number> {
  try {
    return await prisma.like.count({
      where: { postId }
    });
  } catch (error) {
    console.error('Error getting likes count:', error);
    return 0;
  }
}

export async function isPostLiked(postId: string): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return false;

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