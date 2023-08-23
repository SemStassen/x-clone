import { requestPageSession } from "@/server/lucia";
import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const tweetID = await req.json();

    const session = await requestPageSession();

    const like = await prisma.like.findUnique({
      where: {
        userId_tweetId: {
          tweetId: tweetID,
          userId: session.user.userId,
        },
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          userId_tweetId: {
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

export async function GET(req: Request) {
  try {
    const tweetID = await req.json();

    const session = await requestPageSession();

    if (!session) {
      return NextResponse.json(null, {
        status: 401,
      });
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_tweetId: {
          tweetId: tweetID,
          userId: session.user.userId,
        },
      },
    });

    if (like) {
      return NextResponse.json(true, {
        status: 200,
      });
    } else {
      return NextResponse.json(false, {
        status: 200,
      });
    }
  } catch (e) {
    return NextResponse.json(null, {
      status: 500,
    });
  }
}
