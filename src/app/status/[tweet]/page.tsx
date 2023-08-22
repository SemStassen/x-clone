import { Tweet } from "@/components/Ui";
import { getPageSession } from "@/server/lucia";
import { prisma } from "@/server/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    tweet: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await getPageSession();

  const tweetId = params.tweet;
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      user: true,
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId: session?.user.userId,
        },
      },
    },
  });

  return tweet ? <Tweet tweet={tweet}></Tweet> : notFound();
}
