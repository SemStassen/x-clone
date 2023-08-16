import type { Tweet, User } from "@prisma/client";

interface TweetWithUser extends Tweet {
  user: User;
}

interface TweetsProps {
  tweets: Array<TweetWithUser>;
}

export default async function Tweets({ tweets }: TweetsProps) {
  console.log(tweets);
  return (
    <ul>
      {tweets.map((t) => (
        <li key={t.id} className="border px-4 py-6 text-white">
          <small>{t.user.username}</small>
          <p>{t.content}</p>
        </li>
      ))}
    </ul>
  );
}
