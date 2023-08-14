import { NewTweet } from "@/components/Tweet";
import { Tweets } from "@/components/Ui";
import { prisma } from "@/server/prisma";

export default async function Home() {
  const tweets = await prisma.tweet.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen container mx-auto flex">
      <header>
        <div className="w-[400px]">NavBar</div>
      </header>
      <main className="flex w-full">
        <div className="flex-grow">
          <NewTweet />
          <Tweets tweets={tweets} />
        </div>
        <div className="w-[400px]">Trending Tab</div>
      </main>
    </div>
  );
}
