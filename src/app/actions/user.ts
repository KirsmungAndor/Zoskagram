"use server";

import {prisma} from "@/app/api/auth/[...nextauth]/prisma";

export const getUserIdByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });
    return user?.id;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};