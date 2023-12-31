"use client";

import type { Like, Profile, Tweet as TweetType, User } from "@prisma/client";
import { Tweet } from "@/components/Ui";
import { useRouter } from "next/navigation";

interface UserWithProfile extends User {
  profile: Pick<Profile, "username" | "profilePic"> | null;
}

export interface TweetWithUser extends TweetType {
  user: UserWithProfile;
  _count: {
    likes: number;
  };
  likes: Array<Like>;
}

interface TweetsProps {
  tweets: Array<TweetWithUser>;
}

export default function Tweets({ tweets }: TweetsProps) {
  const router = useRouter();

  const routeToTweet: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    tweetId: TweetWithUser["id"],
  ) => any = (event, tweetId) => {
    event.preventDefault();

    const tweet = event.currentTarget;
    const toolbarItems = Array.from(
      tweet.querySelectorAll("[data-toolbar-item]"),
    );

    // if clicked on a toolbar item, don't route
    for (const item of toolbarItems) {
      if (item.contains(event.target as Node)) {
        return;
      }
    }

    router.push(`/status/${tweetId}`);
  };

  return (
    <ul>
      {tweets.map((t) => (
        <li key={t.id}>
          <a
            href={`status/${t.id}`}
            onClick={(e) => {
              routeToTweet(e, t.id);
            }}
          >
            <Tweet tweet={t}></Tweet>
          </a>
        </li>
      ))}
    </ul>
  );
}
