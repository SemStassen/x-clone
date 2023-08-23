import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as db } from "./prisma";
import { nextjs } from "lucia/middleware";
import { cache } from "react";
import { cookies } from "next/headers";

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

export const getRouteSession = () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  return authRequest.validate();
};

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  return authRequest.validate();
});
