import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profile: {
          select: {
            bio: true,
            avatarUrl: true
          }
        },
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...user,
      postsCount: user._count.posts,
      bio: user.profile?.bio,
      image: user.profile?.avatarUrl || user.image
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 