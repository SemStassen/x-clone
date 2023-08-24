import { TweetToolBar } from "../General";
import { TweetWithUser } from "./Tweets";

interface TweetProps {
  tweet: TweetWithUser;
}

export default function Tweet({ tweet }: TweetProps) {
  return (
    <article className="border px-4 py-6 text-white">
      <small>@{tweet.user.handle}</small>
      <p className="  break-all">{tweet.content}</p>
      <TweetToolBar
        id={tweet.id}
        isLiked={Boolean(tweet.likes.length)}
        likes={tweet._count.likes}
      ></TweetToolBar>
    </article>
  );
}
