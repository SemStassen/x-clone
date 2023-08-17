"use client";

import { CommentIcon, HeartIcon } from "@/components/Svg";
import { Like, Tweet } from "@prisma/client";

interface TweetToolBarProps {
  likes: Like[];
  id: Tweet["id"];
}

export default function TweetToolBar({ id, likes }: TweetToolBarProps) {
  return (
    <div className="mt-2 flex justify-between">
      <TweetToolBarItem type="like" id={id} meta={likes}></TweetToolBarItem>
      <TweetToolBarItem type="comment" id={id}></TweetToolBarItem>
    </div>
  );
}

interface TweetToolBarItemProps {
  type: "like" | "comment";
  id: Tweet["id"];
  meta?: Like[];
}

function TweetToolBarItem({ id, type, meta }: TweetToolBarItemProps) {
  let bgColor;
  let svgColor;
  let icon;
  let onclick;

  // define full classnames here so tailwind recognizes them when compiling
  switch (type) {
    case "like":
      bgColor = "group-hover:bg-yellow-200";
      svgColor = "group-hover:text-yellow-200";
      icon = <HeartIcon />;
      onclick = () => {
        updateLikes({ id });
      };
      break;
    case "comment":
      bgColor = "group-hover:bg-green-200";
      svgColor = "group-hover:text-green-200";
      icon = <CommentIcon />;
      break;
  }

  return (
    <button>
      <div className="group flex items-center gap-2" onClick={onclick}>
        <div
          className={`absolute h-8 w-8 -translate-x-1 rounded-full opacity-20  ${bgColor}`}
        ></div>
        <div className="h-6 w-6 fill-current text-slate-400">{icon}</div>
        <span className={`${svgColor}`}>{meta ? meta.length : 0}</span>
      </div>
    </button>
  );
}

interface updateLikesProps {
  id: Tweet["id"];
}

const updateLikes = async ({ id }: updateLikesProps) => {
  try {
    await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  } catch (e) {
    console.log(e);
  }
};
