// src/app/actions/profiles.ts

"use server";

// Import Prisma client
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

// Fetch profiles based on search term
export const fetchProfiles = async (searchTerm: string) => {
  try {
    const profiles = await prisma.profile.findMany({
      where: {
        OR: [
          { user: { name: { contains: searchTerm, mode: "insensitive" } } },
          { interests: { has: searchTerm } },
        ],
      },
      include: { user: true }, // Include user data
    });

    return profiles;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw new Error("Could not fetch profiles");
  }
};

// Fetch a single profile by user ID
export const fetchProfileByUserId = async (userId: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });

    return profile;
  } catch (error) {
    console.error("Error fetching profile by userId:", error);
    throw new Error("Could not fetch profile");
  }
};

export async function searchProfiles(searchTerm: string) {
  try {
    if (!searchTerm.trim()) {
      // Return recent profiles when search is empty
      return await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          profile: {
            select: {
              avatarUrl: true
            }
          }
        },
        take: 10,
      });
    }

    // Search for profiles matching the search term
    return await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profile: {
          select: {
            avatarUrl: true
          }
        }
      },
      take: 20,
    });
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw new Error('Failed to search profiles');
  }
}
