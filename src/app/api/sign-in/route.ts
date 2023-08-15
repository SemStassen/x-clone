import { auth } from "@/server/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.json();
  const username = formData.username;
  const password = formData.password;

  try {
    const user = await auth.useKey(
      "username",
      username.toLowerCase(),
      password,
    );

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest({
      req,
      cookies,
    });

    authRequest.setSession(session);

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
