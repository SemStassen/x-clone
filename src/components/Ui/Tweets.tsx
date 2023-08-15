import type { Tweet } from "@prisma/client";

interface TweetsProps {
  tweets: Array<Tweet>;
}

export default async function Tweets({ tweets }: TweetsProps) {
  return (
    <ul>
      {tweets.map((t) => (
        <li key={t.id} className="border px-4 py-6">
          {t.content}
        </li>
      ))}
    </ul>
  );
}
