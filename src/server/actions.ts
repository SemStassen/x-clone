import { cache } from "react";
import { prisma } from "./prisma";

export const getUserByHandle = cache(
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
