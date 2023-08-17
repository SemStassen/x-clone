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
        textColor={"group-hover:text-yellow-200"}
        bgColor={"group-hover:bg-yellow-200"}
        meta={likes}
        onClick={() => updateLikes({ id })}
      ></TweetToolBarItem>
      <TweetToolBarItem
        icon={<CommentIcon />}
        textColor={"group-hover:text-green-200"}
        bgColor={"group-hover:bg-green-200"}
        onClick={() => null}
        meta={0}
      ></TweetToolBarItem>
    </div>
  );
}

interface TweetToolBarItemProps {
  icon: JSX.Element;
  textColor: string;
  bgColor: string;
  clicked?: boolean;
  onClick: () => void;
  meta: number;
}

function TweetToolBarItem({
  icon,
  textColor,
  bgColor,
  clicked = false,
  onClick,
  meta,
}: TweetToolBarItemProps) {
  let iconActive = "";
  if (clicked) {
    iconActive = "text-red-600";
  }

  return (
    <button>
      <div className="group flex items-center gap-2" onClick={onClick}>
        <div
          className={`absolute h-8 w-8 -translate-x-1 rounded-full opacity-20  ${bgColor}`}
        ></div>
        <div className={`h-6 w-6 fill-current text-slate-400 ${iconActive}`}>
          {icon}
        </div>
        <span className={textColor}>{meta ? meta : 0}</span>
      </div>
    </button>
  );
}
