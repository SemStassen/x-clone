import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { getRouteSession } from "@/server/lucia";

export async function POST(req: Request) {
  const data = await req.json();

  const session = await getRouteSession();

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
