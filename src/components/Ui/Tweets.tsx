import { type Tweet, type User } from "@prisma/client";

interface TweetsProps {
  tweets: Array<Tweet & { user: User }>;
}

export default async function Tweets({ tweets }: TweetsProps) {
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
