"use client";

import { CommentIcon, HeartIcon } from "@/components/Svg";
import { Tweet } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TweetToolBarProps {
  likes: number;
  isLiked: boolean;
  id: Tweet["id"];
}

interface updateLikesProps {
  id: Tweet["id"];
}

export default function TweetToolBar({
  id,
  likes,
  isLiked,
}: TweetToolBarProps) {
  const router = useRouter();

  const updateLikes = async ({ id }: updateLikesProps) => {
    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      if (response.status == 401) {
        router.push("/sign-up");
      }
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
        status={isLiked}
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
  status?: boolean;
  onClick: () => void;
  meta: number;
}

function TweetToolBarItem({
  icon,
  textColor,
  bgColor,
  status,
  onClick,
  meta,
}: TweetToolBarItemProps) {
  let iconActive = "";

  if (status) {
    iconActive = "text-red-500";
  }

  return (
    <button data-toolbar-item="true">
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
