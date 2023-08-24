import { auth } from "@/server/lucia";
import { prisma } from "@/server/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.json();
  const username = formData.username;
  const password = formData.password;

  try {
    const user = await auth.createUser({
      key: {
        providerId: "handle", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        handle: username,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest({
      request: req,
      cookies,
    });

    authRequest.setSession(session);

    await prisma.profile.create({
      data: {
        username: username,
        user: {
          connect: {
            id: user.userId,
          },
        },
      },
    });

    return new Response(null, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      },
    );
  }
};
