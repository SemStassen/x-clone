import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { getPageSession } from "@/server/lucia";

export async function POST(req: Request) {
  const data = await req.json();

  const session = await getPageSession();

  await prisma.tweet.create({
    data: {
      content: data.content,
      user: {
        connect: {
          id: session.user.userId,
        },
      },
    },
  });

  return NextResponse.json(null, {
    status: 200,
  });
}
