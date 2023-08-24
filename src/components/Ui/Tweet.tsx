import { TweetToolBar } from "../Ui";
import { TweetWithUser } from "./Tweets";

interface TweetProps {
  tweet: TweetWithUser;
}

export default function Tweet({ tweet }: TweetProps) {
  return (
    <article className="border px-4 py-6 text-white">
      <div className="mb-2 flex flex-col">
        <h3 className="text-lg font-bold">{tweet.user.profile?.username}</h3>
        <small className=" text-xs text-slate-400">@{tweet.user.handle}</small>
      </div>
      <p className="  break-all">{tweet.content}</p>
      <TweetToolBar
        id={tweet.id}
        isLiked={Boolean(tweet.likes.length)}
        likes={tweet._count.likes}
      ></TweetToolBar>
    </article>
  );
}
