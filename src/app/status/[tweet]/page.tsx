import { Tweet } from "@/components/Ui";
import { getTweetById } from "@/server/actions";
import { getPageSession } from "@/server/lucia";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    tweet: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await getPageSession();

  const tweetId = params.tweet;
  const tweet = await getTweetById(session, tweetId);

  return tweet ? <Tweet tweet={tweet}></Tweet> : notFound();
}
