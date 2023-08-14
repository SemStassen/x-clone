import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// default values
const auth = lucia({
  adapter: prisma(client, {
    user: "user",
    key: "key",
    session: "session",
  }),
  env: "DEV",
});

export type Auth = typeof auth;
