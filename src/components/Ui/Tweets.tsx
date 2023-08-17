import type { Tweet, User } from "@prisma/client";
import { TweetToolBar } from "../General";

interface TweetWithUser extends Tweet {
  user: User;
  _count: {
    likes: number;
  };
}

interface TweetsProps {
  tweets: Array<TweetWithUser>;
}

export default async function Tweets({ tweets }: TweetsProps) {
  return (
    <ul>
      {tweets.map((t) => (
        <li key={t.id} className="border px-4 py-6 text-white">
          <small>@{t.user.username}</small>
          <p>{t.content}</p>
          <TweetToolBar id={t.id} likes={t._count.likes}></TweetToolBar>
        </li>
      ))}
    </ul>
  );
}
