import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { auth } from "@/server/lucia";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();

  const session = await auth
    .handleRequest({
      request: null,
      cookies,
    })
    .validate();

  console.log(session);

  const tweet = await prisma.tweet.create({
    data: {
      content: data.content,
      user: {
        connect: {
          id: session.user.userId,
        },
      },
    },
  });
  console.log(tweet);

  return NextResponse.json(data, {
    status: 200,
  });
}
