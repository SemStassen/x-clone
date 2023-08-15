import { NewTweet } from "@/components/Tweet";
import { Tweets } from "@/components/Ui";
import { prisma } from "@/server/prisma";

export default async function Home() {
  const tweets = await prisma.tweet.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
  });

  return (
    <div className="container mx-auto flex min-h-screen">
      <header>
        <div className="w-[400px] text-white">NavBar</div>
      </header>
      <main className="flex w-full">
        <div className="flex-grow">
          <NewTweet />
          <Tweets tweets={tweets} />
        </div>
        <div className="w-[400px] text-white">Trending Tab</div>
      </main>
    </div>
  );
}
