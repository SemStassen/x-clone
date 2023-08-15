import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as db } from "./prisma";
import { nextjs } from "lucia/middleware";

// default values
export const auth = lucia({
  adapter: prisma(db, {
    user: "user",
    key: "key",
    session: "session",
  }),
  env: "DEV",
  middleware: nextjs(),
  sessionCookie: {
    expires: false,
  },

  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;
