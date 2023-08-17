"use client";

import { CommentIcon, HeartIcon } from "@/components/Svg";
import { Tweet } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TweetToolBarProps {
  likes: number;
  id: Tweet["id"];
}

interface updateLikesProps {
  id: Tweet["id"];
}

export default function TweetToolBar({ id, likes }: TweetToolBarProps) {
  const router = useRouter();

  const updateLikes = async ({ id }: updateLikesProps) => {
    try {
      await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-2 flex justify-between">
      <TweetToolBarItem
        icon={<HeartIcon />}
        svgColor={"group-hover:text-yellow-200"}
        bgColor={"group-hover:bg-yellow-200"}
        meta={likes}
        onClick={() => updateLikes({ id })}
      ></TweetToolBarItem>
      <TweetToolBarItem
        icon={<CommentIcon />}
        svgColor={"group-hover:text-green-200"}
        bgColor={"group-hover:bg-green-200"}
        onClick={() => null}
        meta={0}
      ></TweetToolBarItem>
    </div>
  );
}

interface TweetToolBarItemProps {
  icon: JSX.Element;
  svgColor: string;
  bgColor: string;
  onClick: () => void;
  meta: number;
}

function TweetToolBarItem({
  icon,
  svgColor,
  bgColor,
  onClick,
  meta,
}: TweetToolBarItemProps) {
  return (
    <button>
      <div className="group flex items-center gap-2" onClick={onClick}>
        <div
          className={`absolute h-8 w-8 -translate-x-1 rounded-full opacity-20  ${bgColor}`}
        ></div>
        <div className="h-6 w-6 fill-current text-slate-400">{icon}</div>
        <span className={svgColor}>{meta ? meta : 0}</span>
      </div>
    </button>
  );
}
