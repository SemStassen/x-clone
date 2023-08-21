import type { Like, Tweet as TweetType, User } from "@prisma/client";
import Link from "next/link";
import { Tweet } from "@/components/Ui";

export interface TweetWithUser extends TweetType {
  user: User;
  _count: {
    likes: number;
  };
  likes: Array<Like>;
}

interface TweetsProps {
  tweets: Array<TweetWithUser>;
}

export default async function Tweets({ tweets }: TweetsProps) {
  return (
    <ul>
      {tweets.map((t) => (
        <li key={t.id}>
          <Link href={`status/${t.id}`}>
            <Tweet tweet={t}></Tweet>
          </Link>
        </li>
      ))}
    </ul>
  );
}
