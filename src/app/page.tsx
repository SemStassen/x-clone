import { Button } from "@/components/General";
import { NewTweet } from "@/components/NewTweet";
import { Tweets } from "@/components/Ui";
import { auth } from "@/server/lucia";
import { prisma } from "@/server/prisma";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const tweets = await prisma.tweet.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
  });

  const session = await auth
    .handleRequest({
      request: null,
      cookies,
    })
    .validate();

  return (
    <div className="container mx-auto flex min-h-screen">
      <header>
        <div className="w-[400px] text-white">NavBar</div>
      </header>
      <main className="flex w-full">
        <div className="flex-grow">
          {session ? (
            <NewTweet />
          ) : (
            <>
              <Button>
                <Link href="/sign-up">Create a new account</Link>
              </Button>
              <span className="mx-4 text-slate-50">or</span>
              <Button>
                <Link href="/sign-in">log into an existing account</Link>
              </Button>
            </>
          )}
          <Tweets tweets={tweets} />
        </div>
        <div className="w-[400px] text-white">Trending Tab</div>
      </main>
    </div>
  );
}
