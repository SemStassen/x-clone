import { auth } from "@/server/lucia";
import { prisma } from "@/server/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const tweetID = await req.json();

    const session = await auth
      .handleRequest({
        request: null,
        cookies,
      })
      .validate();

    if (!session) {
      return NextResponse.json(null, {
        status: 401,
      });
    }

    const like = await prisma.like.findUnique({
      where: {
        id: {
          tweetId: tweetID,
          userId: session.user.userId,
        },
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          id: {
            tweetId: tweetID,
            userId: session.user.userId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          user: {
            connect: {
              id: session.user.userId,
            },
          },
          tweet: {
            connect: {
              id: tweetID,
            },
          },
        },
      });
    }
    return NextResponse.json(null, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(null, {
      status: 500,
    });
  }
}
