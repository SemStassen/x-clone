import { EditProfileFormData } from "@/components/Profile/EditProfileButton";
import { getRouteSession } from "@/server/lucia";
import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await getRouteSession();
    if (!session) {
      return new Response(null, {
        status: 401,
      });
    }

    const data: EditProfileFormData = await req.json();

    const removedEmptyData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != null && v != ""),
    );
    console.log(removedEmptyData);

    await prisma.profile.update({
      where: {
        userId: session.user.userId,
      },
      data: removedEmptyData,
    });

    return NextResponse.json(null, {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(null, {
      status: 500,
    });
  }
}
