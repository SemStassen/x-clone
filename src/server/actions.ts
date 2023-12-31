import { cache } from "react";
import { prisma } from "./prisma";

const getTweetsByAmount = cache(
  async (session: any, amount: number = 10) =>
    await prisma.tweet.findMany({
      take: amount,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          include: {
            profile: {
              select: {
                username: true,
                profilePic: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: session?.user.userId,
          },
        },
      },
    }),
);

const getTweetById = cache(
  async (session: any, tweetId: string) =>
    await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: {
        user: true,
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: session?.user.userId,
          },
        },
      },
    }),
);

const getUserByHandle = cache(
  async (handle: string) =>
    await prisma.user.findUnique({
      where: {
        handle: handle,
      },
      include: {
        profile: true,
      },
    }),
);

export { getTweetsByAmount, getTweetById, getUserByHandle };
